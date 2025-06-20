/**
 * Sends an HTTP request over a socket, handling body encoding, headers, connection state, and error management.
 * Supports various body types (Buffer, Blob, Stream, Iterable, FormData) and manages connection upgrades, keep-alive, and abort/reset logic.
 *
 * @param {object} socketContext - The socket context or connection object, containing socket state and configuration.
 * @param {object} createRequestOptions - The request options object, containing method, path, headers, body, and various flags.
 * @returns {boolean} Returns true if the request was initiated successfully, false if aborted or errored early.
 */
function sendHttpRequest(socketContext, createRequestOptions) {
  // Destructure request options for clarity
  let {
    method,
    path,
    host,
    upgrade,
    blocking,
    reset
  } = createRequestOptions;

  let {
    body,
    headers,
    contentLength
  } = createRequestOptions;

  // Methods that typically have a body
  const methodAllowsBody = [
    "PUT",
    "POST",
    "PATCH",
    "QUERY",
    "PROPFIND",
    "PROPPATCH"
  ].includes(method);

  // Handle FormData-like bodies
  if (E4.isFormDataLike(body)) {
    if (!_d1) _d1 = Eh().extractBody;
    const [formDataBody, contentType] = _d1(body);
    if (createRequestOptions.contentType == null) headers.push("content-type", contentType);
    body = formDataBody.stream;
    contentLength = formDataBody.length;
  } else if (E4.isBlobLike(body) && createRequestOptions.contentType == null && body.type) {
    // Handle Blob-like bodies
    headers.push("content-type", body.type);
  }

  // If the body is a readable stream, trigger a read to initialize
  if (body && typeof body.read === "function") {
    body.read(0);
  }

  // Determine the body length
  let calculatedBodyLength = E4.bodyLength(body);
  if (contentLength == null) {
    contentLength = calculatedBodyLength;
  } else {
    contentLength = calculatedBodyLength ?? contentLength;
  }
  if (contentLength === null) {
    contentLength = createRequestOptions.contentLength;
  }
  // If method does not allow body and contentLength is 0, set to null
  if (contentLength === 0 && !methodAllowsBody) {
    contentLength = null;
  }

  // Validate content length for certain methods
  if (
    isNonIdempotentHttpMethod(method) &&
    contentLength > 0 &&
    createRequestOptions.contentLength !== null &&
    createRequestOptions.contentLength !== contentLength
  ) {
    if (socketContext[yd1]) {
      E4.errorRequest(socketContext, createRequestOptions, new b_());
      return false;
    }
    process.emitWarning(new b_());
  }

  // Get the socket state object
  const socketState = socketContext[Nh];

  // Error handler for abort/completion
  const handleError = (error) => {
    if (createRequestOptions.aborted || createRequestOptions.completed) return;
    E4.errorRequest(socketContext, createRequestOptions, error || new kh0());
    E4.destroy(body);
    E4.destroy(socketState, new Uh("aborted"));
  };

  // Call onConnect hook and handle errors
  try {
    createRequestOptions.onConnect(handleError);
  } catch (connectError) {
    E4.errorRequest(socketContext, createRequestOptions, connectError);
  }

  // If aborted during onConnect, stop
  if (createRequestOptions.aborted) return false;

  // Set socket state flags based on method and options
  if (method === "HEAD") socketState[nY] = true;
  if (upgrade || method === "CONNECT") socketState[nY] = true;
  if (reset != null) socketState[nY] = reset;
  if (
    socketContext[Ph0] &&
    socketState[YX6]++ >= socketContext[Ph0]
  ) {
    socketState[nY] = true;
  }
  if (blocking) socketState[Fr] = true;

  // Build the HTTP request headers
  let headerString = `${method} ${path} HTTP/1.1\r\n`;
  if (typeof host === "string") {
    headerString += `host: ${host}\r\n`;
  } else {
    headerString += socketContext[BX6];
  }

  // Connection/Upgrade headers
  if (upgrade) {
    headerString += `connection: upgrade\r\nupgrade: ${upgrade}\r\n`;
  } else if (socketContext[AY1] && !socketState[nY]) {
    headerString += `connection: keep-alive\r\n`;
  } else {
    headerString += `connection: close\r\n`;
  }

  // Append custom headers
  if (Array.isArray(headers)) {
    for (let i = 0; i < headers.length; i += 2) {
      const headerName = headers[i];
      const headerValue = headers[i + 1];
      if (Array.isArray(headerValue)) {
        for (let j = 0; j < headerValue.length; j++) {
          headerString += `${headerName}: ${headerValue[j]}\r\n`;
        }
      } else {
        headerString += `${headerName}: ${headerValue}\r\n`;
      }
    }
  }

  // Publish headers event if there are subscribers
  if (Oh0.sendHeaders.hasSubscribers) {
    Oh0.sendHeaders.publish({
      request: createRequestOptions,
      headers: headerString,
      socket: socketState
    });
  }

  // Send the body using the appropriate method based on its type
  if (!body || calculatedBodyLength === 0) {
    // No body or empty body
    sendHttpRequestBody(handleError, null, socketContext, createRequestOptions, socketState, contentLength, headerString, methodAllowsBody);
  } else if (E4.isBuffer(body)) {
    // Buffer body
    sendHttpRequestBody(handleError, body, socketContext, createRequestOptions, socketState, contentLength, headerString, methodAllowsBody);
  } else if (E4.isBlobLike(body)) {
    // Blob-like body
    if (typeof body.stream === "function") {
      streamIteratorToSocket(handleError, body.stream(), socketContext, createRequestOptions, socketState, contentLength, headerString, methodAllowsBody);
    } else {
      sendBlobBodyWithHeaders(handleError, body, socketContext, createRequestOptions, socketState, contentLength, headerString, methodAllowsBody);
    }
  } else if (E4.isStream(body)) {
    // Stream body
    pipeStreamBodyToSocket(handleError, body, socketContext, createRequestOptions, socketState, contentLength, headerString, methodAllowsBody);
  } else if (E4.isIterable(body)) {
    // Iterable body
    streamIteratorToSocket(handleError, body, socketContext, createRequestOptions, socketState, contentLength, headerString, methodAllowsBody);
  } else {
    // Unknown body type
    l9(false);
  }

  return true;
}

module.exports = sendHttpRequest;