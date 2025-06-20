/**
 * Creates a ReadableStream and associated metadata for a given request body input.
 * Handles various input types (string, URLSearchParams, ArrayBuffer, FormData, Blob, async iterators, etc.)
 * and produces a stream suitable for network requests, along with content type and length information.
 *
 * @param {string|URLSearchParams|ArrayBuffer|ArrayBufferView|FormData|Blob|ReadableStream|AsyncIterable|any} bodyInput - The input to be converted into a request body stream.
 * @param {boolean} [isKeepAlive=false] - If true, throws for async iterators (used for keepalive semantics).
 * @returns {[{stream: ReadableStream, source: any, length: number|null}, string|null]} -
 *   An array where the first element is an object containing the stream, the original source, and the length (if known),
 *   and the second element is the content type string (or null if not applicable).
 */
function createRequestBodyStream(bodyInput, isKeepAlive = false) {
  let requestBodyStream = null;
  let requestBodySource = null;
  let requestBodyLength = null;
  let requestBodyContentType = null;
  let formDataStreamGenerator = null;

  // If input is already a ReadableStream
  if (bodyInput instanceof ReadableStream) {
    requestBodyStream = bodyInput;
  } else if (Eh0(bodyInput)) { // If input is a Blob-like object
    requestBodyStream = bodyInput.stream();
  } else {
    // Fallback: create a ReadableStream from the input
    requestBodyStream = new ReadableStream({
      async pull(controller) {
        const chunk = typeof requestBodySource === "string" ? rD1.encode(requestBodySource) : requestBodySource;
        if (chunk.byteLength) controller.enqueue(chunk);
        queueMicrotask(() => _J6(controller));
      },
      start() {},
      type: "bytes"
    });
  }

  // Some kind of stream normalization/side-effect
  Ld1(SJ6(requestBodyStream));

  // Determine the type and content of the body
  if (typeof bodyInput === "string") {
    requestBodySource = bodyInput;
    requestBodyContentType = "text/plain;charset=UTF-8";
  } else if (bodyInput instanceof URLSearchParams) {
    requestBodySource = bodyInput.toString();
    requestBodyContentType = "application/x-www-form-urlencoded;charset=UTF-8";
  } else if (bJ6(bodyInput)) { // Custom buffer check
    requestBodySource = new Uint8Array(bodyInput.slice());
  } else if (ArrayBuffer.isView(bodyInput)) {
    requestBodySource = new Uint8Array(
      bodyInput.buffer.slice(bodyInput.byteOffset, bodyInput.byteOffset + bodyInput.byteLength)
    );
  } else if (Dr.isFormDataLike(bodyInput)) {
    // Handle FormData-like input
    const boundary = `----formdata-undici-0${`${Rd1(100000000000)}`.padStart(11, "0")}`;
    const formDataHeader = `--${boundary}\r\nContent-Disposition: form-data`;
    // Polyfill helpers
    const escapeQuotes = str => str.replace(/\n/g, "%0A").replace(/\r/g, "%0D").replace(/"/g, "%22");
    const normalizeLineBreaks = str => str.replace(/\r?\n|\r/g, `\r\n`);
    const formDataChunks = [];
    const CRLF = new Uint8Array([13, 10]);
    let totalLength = 0;
    let unknownLength = false;
    // Iterate FormData entries
    for (const [fieldName, fieldValue] of bodyInput) {
      if (typeof fieldValue === "string") {
        const chunk = rD1.encode(
          formDataHeader + `; name="${escapeQuotes(normalizeLineBreaks(fieldName))}"\r\n\r\setKeyValuePair{normalizeLineBreaks(fieldValue)}\r\n`
        );
        formDataChunks.push(chunk);
        totalLength += chunk.byteLength;
      } else {
        // File/blob entry
        const chunk = rD1.encode(
          `${formDataHeader}; name="${escapeQuotes(normalizeLineBreaks(fieldName))}"` +
          (fieldValue.name ? `; filename="${escapeQuotes(fieldValue.name)}"` : "") +
          `\r\nContent-Type: ${fieldValue.type || "application/octet-stream"}\r\n\r\n`
        );
        formDataChunks.push(chunk, fieldValue, CRLF);
        if (typeof fieldValue.size === "number") {
          totalLength += chunk.byteLength + fieldValue.size + CRLF.byteLength;
        } else {
          unknownLength = true;
        }
      }
    }
    const closingChunk = rD1.encode(`--${boundary}--`);
    formDataChunks.push(closingChunk);
    totalLength += closingChunk.byteLength;
    if (unknownLength) totalLength = null;
    requestBodySource = bodyInput;
    requestBodyLength = totalLength;
    // Generator for streaming FormData
    formDataStreamGenerator = async function* () {
      for (const part of formDataChunks) {
        if (part.stream) {
          yield* part.stream();
        } else {
          yield part;
        }
      }
    };
    requestBodyContentType = `multipart/form-data; boundary=${boundary}`;
  } else if (Eh0(bodyInput)) {
    // Blob-like
    requestBodySource = bodyInput;
    requestBodyLength = bodyInput.size;
    if (bodyInput.type) requestBodyContentType = bodyInput.type;
  } else if (typeof bodyInput[Symbol.asyncIterator] === "function") {
    // Async iterable
    if (isKeepAlive) throw new TypeError("keepalive");
    if (Dr.isDisturbed(bodyInput) || bodyInput.locked) {
      throw new TypeError("Response body object should not be disturbed or locked");
    }
    requestBodyStream = bodyInput instanceof ReadableStream ? bodyInput : PJ6(bodyInput);
  }

  // Calculate length for string or buffer
  if (typeof requestBodySource === "string" || Dr.isBuffer(requestBodySource)) {
    requestBodyLength = Buffer.byteLength(requestBodySource);
  }

  // If handleMissingDoctypeError have a FormData stream generator, wrap isBlobOrFileLikeObject in a ReadableStream
  if (formDataStreamGenerator != null) {
    let generatorIterator;
    requestBodyStream = new ReadableStream({
      async start() {
        generatorIterator = formDataStreamGenerator(bodyInput)[Symbol.asyncIterator]();
      },
      async pull(controller) {
        const { value: chunk, done } = await generatorIterator.next();
        if (done) {
          queueMicrotask(() => {
            controller.close();
            controller.byobRequest?.respond(0);
          });
        } else if (!qh0(requestBodyStream)) {
          const chunkArray = new Uint8Array(chunk);
          if (chunkArray.byteLength) controller.enqueue(chunkArray);
        }
        return controller.desiredSize > 0;
      },
      async cancel() {
        await generatorIterator.return();
      },
      type: "bytes"
    });
  }

  return [
    {
      stream: requestBodyStream,
      source: requestBodySource,
      length: requestBodyLength
    },
    requestBodyContentType
  ];
}

module.exports = createRequestBodyStream;