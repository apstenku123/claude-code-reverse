/**
 * Sends an HTTP request over a socket, handling headers, body, and connection options.
 * Supports various body types (Buffer, Stream, Blob, FormData, Iterable) and manages connection upgrades, aborts, and errors.
 *
 * @param {object} socketContext - The socket context or connection object.
 * @param {object} requestConfig - The configuration for the HTTP request, including method, path, headers, body, etc.
 * @returns {boolean} - Returns true if the request was sent successfully, false otherwise.
 */
function sendHttpRequestOverSocket(socketContext, requestConfig) {
  // Destructure request configuration
  let {
    method,
    path,
    host,
    upgrade,
    blocking,
    reset
  } = requestConfig;

  let {
    body,
    headers,
    contentLength
  } = requestConfig;

  // Methods that typically have a body
  const methodAllowsBody = ["PUT", "POST", "PATCH", "QUERY", "PROPFIND", "PROPPATCH"].includes(method);

  // Handle FormData-like bodies
  if (E4.isFormDataLike(body)) {
    if (!_d1) _d1 = Eh().extractBody;
    let [formDataBody, formDataContentType] = _d1(body);
    if (requestConfig.contentType == null) headers.push("content-type", formDataContentType);
    body = formDataBody.stream;
    contentLength = formDataBody.length;
  } else if (E4.isBlobLike(body) && requestConfig.contentType == null && body.type) {
    // Handle Blob-like bodies
    headers.push("content-type", body.type);
  }

  // If the body is a readable stream, trigger a read to start flowing
  if (body && typeof body.read === "function") body.read(0);

  // Calculate body length
  let calculatedBodyLength = E4.bodyLength(body);
  contentLength = calculatedBodyLength ?? contentLength;
  if (contentLength === null) contentLength = requestConfig.contentLength;
  if (contentLength === 0 && !methodAllowsBody) contentLength = null;

  // Check for content-length mismatch on certain methods
  if (isNonIdempotentHttpMethod(method) && contentLength > 0 && requestConfig.contentLength !== null && requestConfig.contentLength !== contentLength) {
    if (socketContext[yd1]) {
      E4.errorRequest(socketContext, requestConfig, new b_());
      return false;
    }
    process.emitWarning(new b_());
  }

  // Retrieve the underlying socket
  let socket = socketContext[Nh];

  /**
   * Error/abort handler for the request
   * @param {Error} [error]
   */
  const handleAbortOrError = (error) => {
    if (requestConfig.aborted || requestConfig.completed) return;
    E4.errorRequest(socketContext, requestConfig, error || new kh0());
    E4.destroy(body);
    E4.destroy(socket, new Uh("aborted"));
  };

  // Call onConnect hook
  try {
    requestConfig.onConnect(handleAbortOrError);
  } catch (connectError) {
    E4.errorRequest(socketContext, requestConfig, connectError);
  }

  if (requestConfig.aborted) return false;

  // Set socket flags based on method and options
  if (method === "HEAD") socket[nY] = true;
  if (upgrade || method === "CONNECT") socket[nY] = true;
  if (reset != null) socket[nY] = reset;
  if (socketContext[Ph0] && socket[YX6]++ >= socketContext[Ph0]) socket[nY] = true;
  if (blocking) socket[Fr] = true;

  // Start building the HTTP request headers
  let headerString = `${method} ${path} HTTP/1.1\r\n`;

  // Host header
  if (typeof host === "string") {
    headerString += `host: ${host}\r\n`;
  } else {
    headerString += socketContext[BX6];
  }

  // Connection and upgrade headers
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
      request: requestConfig,
      headers: headerString,
      socket: socket
    });
  }

  // Send the body using the appropriate method based on its type
  if (!body || calculatedBodyLength === 0) {
    // No body or empty body
    sendHttpRequestBody(handleAbortOrError, null, socketContext, requestConfig, socket, contentLength, headerString, methodAllowsBody);
  } else if (E4.isBuffer(body)) {
    // Buffer body
    sendHttpRequestBody(handleAbortOrError, body, socketContext, requestConfig, socket, contentLength, headerString, methodAllowsBody);
  } else if (E4.isBlobLike(body)) {
    // Blob body
    if (typeof body.stream === "function") {
      streamIteratorToSocket(handleAbortOrError, body.stream(), socketContext, requestConfig, socket, contentLength, headerString, methodAllowsBody);
    } else {
      sendBlobBodyWithHeaders(handleAbortOrError, body, socketContext, requestConfig, socket, contentLength, headerString, methodAllowsBody);
    }
  } else if (E4.isStream(body)) {
    // Node.js stream body
    pipeStreamBodyToSocket(handleAbortOrError, body, socketContext, requestConfig, socket, contentLength, headerString, methodAllowsBody);
  } else if (E4.isIterable(body)) {
    // Async iterable body
    streamIteratorToSocket(handleAbortOrError, body, socketContext, requestConfig, socket, contentLength, headerString, methodAllowsBody);
  } else {
    // Unknown body type
    l9(false);
  }

  return true;
}

module.exports = sendHttpRequestOverSocket;