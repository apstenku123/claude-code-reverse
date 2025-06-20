/**
 * Handles the construction and sending of an HTTP PROPPATCH (or similar) request over a socket.
 * Prepares headers, manages body types (buffer, stream, blob, form data, iterable),
 * sets connection flags, and triggers appropriate error handling and cleanup.
 *
 * @param {object} socketContext - The context object representing the socket and its state.
 * @param {object} createRequestOptions - The request configuration, including method, path, headers, body, etc.
 * @returns {boolean} Returns true if the request was successfully initiated, false otherwise.
 */
function handleHttpRequestProppatch(socketContext, createRequestOptions) {
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
    let [formDataStream, formDataContentType] = _d1(body);
    if (createRequestOptions.contentType == null) headers.push("content-type", formDataContentType);
    body = formDataStream.stream;
    contentLength = formDataStream.length;
  } else if (E4.isBlobLike(body) && createRequestOptions.contentType == null && body.type) {
    // Handle Blob-like bodies
    headers.push("content-type", body.type);
  }

  // If body is a readable stream, trigger a read to prime isBlobOrFileLikeObject
  if (body && typeof body.read === "function") body.read(0);

  // Determine body length
  let computedBodyLength = E4.bodyLength(body);
  contentLength = computedBodyLength ?? contentLength;
  if (contentLength === null) contentLength = createRequestOptions.contentLength;
  if (contentLength === 0 && !methodAllowsBody) contentLength = null;

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

  // Get the socket object from context
  let socket = socketContext[Nh];

  // Error handler for connection aborts or failures
  const handleError = (error) => {
    if (createRequestOptions.aborted || createRequestOptions.completed) return;
    E4.errorRequest(socketContext, createRequestOptions, error || new kh0());
    E4.destroy(body);
    E4.destroy(socket, new Uh("aborted"));
  };

  // Attempt to call onConnect hook
  try {
    createRequestOptions.onConnect(handleError);
  } catch (connectError) {
    E4.errorRequest(socketContext, createRequestOptions, connectError);
  }

  if (createRequestOptions.aborted) return false;

  // Set socket flags based on method and options
  if (method === "HEAD") socket[nY] = true;
  if (upgrade || method === "CONNECT") socket[nY] = true;
  if (reset != null) socket[nY] = reset;
  if (socketContext[Ph0] && socket[YX6]++ >= socketContext[Ph0]) socket[nY] = true;
  if (blocking) socket[Fr] = true;

  // Build the HTTP request header string
  let headerString = `${method} ${path} HTTP/1.1\r\n`;
  if (typeof host === "string") {
    headerString += `host: ${host}\r\n`;
  } else {
    headerString += socketContext[BX6];
  }

  // Connection headers
  if (upgrade) {
    headerString += `connection: upgrade\r\nupgrade: ${upgrade}\r\n`;
  } else if (socketContext[AY1] && !socket[nY]) {
    headerString += `connection: keep-alive\r\n`;
  } else {
    headerString += `connection: close\r\n`;
  }

  // Append custom headers
  if (Array.isArray(headers)) {
    for (let i = 0; i < headers.length; i += 2) {
      let headerName = headers[i];
      let headerValue = headers[i + 1];
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
      socket
    });
  }

  // Send the request body using the appropriate handler based on its type
  if (!body || computedBodyLength === 0) {
    sendHttpRequestBody(handleError, null, socketContext, createRequestOptions, socket, contentLength, headerString, methodAllowsBody);
  } else if (E4.isBuffer(body)) {
    sendHttpRequestBody(handleError, body, socketContext, createRequestOptions, socket, contentLength, headerString, methodAllowsBody);
  } else if (E4.isBlobLike(body)) {
    if (typeof body.stream === "function") {
      streamIteratorToSocket(handleError, body.stream(), socketContext, createRequestOptions, socket, contentLength, headerString, methodAllowsBody);
    } else {
      sendBlobBodyWithHeaders(handleError, body, socketContext, createRequestOptions, socket, contentLength, headerString, methodAllowsBody);
    }
  } else if (E4.isStream(body)) {
    pipeStreamBodyToSocket(handleError, body, socketContext, createRequestOptions, socket, contentLength, headerString, methodAllowsBody);
  } else if (E4.isIterable(body)) {
    streamIteratorToSocket(handleError, body, socketContext, createRequestOptions, socket, contentLength, headerString, methodAllowsBody);
  } else {
    l9(false);
  }

  return true;
}

module.exports = handleHttpRequestProppatch;