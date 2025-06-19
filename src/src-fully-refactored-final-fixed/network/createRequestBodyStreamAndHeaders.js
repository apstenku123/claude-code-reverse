/**
 * Creates a ReadableStream and determines the appropriate Content-Type header for a given request body input.
 * Handles strings, URLSearchParams, ArrayBuffers, FormData, Blobs, and async iterators.
 * Returns an object containing the stream, the original source, the computed length (if available), and the content type.
 *
 * @param {string|URLSearchParams|ArrayBuffer|ArrayBufferView|FormData|Blob|ReadableStream|AsyncIterable|any} bodyInput - The request body to process.
 * @param {boolean} [disallowAsyncIterator=false] - If true, throws on async iterators (used for keepalive semantics).
 * @returns {[{stream: ReadableStream, source: any, length: number|null}, string|undefined]} - An array: [bodyInfo, contentType].
 */
function createRequestBodyStreamAndHeaders(bodyInput, disallowAsyncIterator = false) {
  let requestStream = null;
  let bodySource = null;
  let contentLength = null;
  let contentType = undefined;
  let multipartIterator = null;

  // If input is already a ReadableStream, use isBlobOrFileLikeObject directly
  if (bodyInput instanceof ReadableStream) {
    requestStream = bodyInput;
  } else if (Eh0(bodyInput)) { // If input is a Blob-like object
    requestStream = bodyInput.stream();
  } else {
    // Otherwise, create a ReadableStream that enqueues the bodySource
    requestStream = new ReadableStream({
      async pull(controller) {
        // Encode string bodySource as Uint8Array if needed
        const chunk = typeof bodySource === "string" ? rD1.encode(bodySource) : bodySource;
        if (chunk.byteLength) controller.enqueue(chunk);
        // Schedule closing the stream on the next microtask
        queueMicrotask(() => _J6(controller));
      },
      start() {},
      type: "bytes"
    });
  }

  // Register the stream for internal tracking
  Ld1(SJ6(requestStream));

  // Determine the bodySource and contentType based on input type
  if (typeof bodyInput === "string") {
    bodySource = bodyInput;
    contentType = "text/plain;charset=UTF-8";
  } else if (bodyInput instanceof URLSearchParams) {
    bodySource = bodyInput.toString();
    contentType = "application/x-www-form-urlencoded;charset=UTF-8";
  } else if (bJ6(bodyInput)) { // ArrayBuffer
    bodySource = new Uint8Array(bodyInput.slice());
  } else if (ArrayBuffer.isView(bodyInput)) {
    bodySource = new Uint8Array(bodyInput.buffer.slice(bodyInput.byteOffset, bodyInput.byteOffset + bodyInput.byteLength));
  } else if (Dr.isFormDataLike(bodyInput)) {
    // Handle FormData serialization (multipart/form-data)
    const boundary = `----formdata-undici-0${`${Rd1(100000000000)}`.padStart(11, "0")}`;
    const partHeader = `--${boundary}\r\nContent-Disposition: form-data`;
    // Polyfill helpers for escaping names and values
    const escapeQuotes = str => str.replace(/\n/g, "%0A").replace(/\r/g, "%0D").replace(/"/g, "%22");
    const normalizeLinebreaks = str => str.replace(/\r?\n|\r/g, `\r\n`);
    const multipartChunks = [];
    const CRLF = new Uint8Array([13, 10]);
    contentLength = 0;
    let unknownLength = false;
    // Iterate over FormData entries
    for (const [fieldName, fieldValue] of bodyInput) {
      if (typeof fieldValue === "string") {
        // String field
        const part = rD1.encode(
          partHeader + `; name="${escapeQuotes(normalizeLinebreaks(fieldName))}"\r\n\r\setKeyValuePair{normalizeLinebreaks(fieldValue)}\r\n`
        );
        multipartChunks.push(part);
        contentLength += part.byteLength;
      } else {
        // File/blob field
        const part = rD1.encode(
          `${partHeader}; name="${escapeQuotes(normalizeLinebreaks(fieldName))}"` +
          (fieldValue.name ? `; filename="${escapeQuotes(fieldValue.name)}"` : "") +
          `\r\nContent-Type: ${fieldValue.type || "application/octet-stream"}\r\n\r\n`
        );
        multipartChunks.push(part, fieldValue, CRLF);
        if (typeof fieldValue.size === "number") {
          contentLength += part.byteLength + fieldValue.size + CRLF.byteLength;
        } else {
          unknownLength = true;
        }
      }
    }
    // Add final boundary
    const endBoundary = rD1.encode(`--${boundary}--`);
    multipartChunks.push(endBoundary);
    contentLength += endBoundary.byteLength;
    if (unknownLength) contentLength = null;
    bodySource = bodyInput;
    // Async generator for streaming multipart chunks
    multipartIterator = async function* () {
      for (const chunk of multipartChunks) {
        if (chunk.stream) {
          yield* chunk.stream();
        } else {
          yield chunk;
        }
      }
    };
    contentType = `multipart/form-data; boundary=${boundary}`;
  } else if (Eh0(bodyInput)) { // Blob-like
    bodySource = bodyInput;
    contentLength = bodyInput.size;
    if (bodyInput.type) contentType = bodyInput.type;
  } else if (typeof bodyInput?.[Symbol.asyncIterator] === "function") {
    // Async iterable body
    if (disallowAsyncIterator) throw new TypeError("keepalive");
    if (Dr.isDisturbed(bodyInput) || bodyInput.locked) {
      throw new TypeError("Response body object should not be disturbed or locked");
    }
    requestStream = bodyInput instanceof ReadableStream ? bodyInput : PJ6(bodyInput);
  }

  // Compute contentLength for string or buffer bodies
  if (typeof bodySource === "string" || Dr.isBuffer(bodySource)) {
    contentLength = Buffer.byteLength(bodySource);
  }

  // If handleMissingDoctypeError have a multipart iterator, wrap isBlobOrFileLikeObject in a ReadableStream
  if (multipartIterator != null) {
    let iterator;
    requestStream = new ReadableStream({
      async start() {
        iterator = multipartIterator(bodyInput)[Symbol.asyncIterator]();
      },
      async pull(controller) {
        const { value: chunk, done } = await iterator.next();
        if (done) {
          queueMicrotask(() => {
            controller.close();
            controller.byobRequest?.respond(0);
          });
        } else if (!qh0(requestStream)) {
          // Ensure chunk is Uint8Array
          const bufferChunk = new Uint8Array(chunk);
          if (bufferChunk.byteLength) controller.enqueue(bufferChunk);
        }
        return controller.desiredSize > 0;
      },
      async cancel() {
        await iterator.return();
      },
      type: "bytes"
    });
  }

  return [
    {
      stream: requestStream,
      source: bodySource,
      length: contentLength
    },
    contentType
  ];
}

module.exports = createRequestBodyStreamAndHeaders;
