/**
 * Sends an HTTP request over a socket, handling headers, body, and connection options.
 * Supports various body types (Buffer, Stream, Blob, Iterable, FormData), manages headers,
 * and emits events for request lifecycle. Handles errors, aborts, and connection upgrades.
 *
 * @param {object} client - The client or socket context (contains connection state and options).
 * @param {object} requestConfig - The request configuration object (method, path, headers, body, etc).
 * @returns {boolean} Returns true if the request was sent, false if aborted or errored.
 */
function sendHttpRequestOverSocket(client, requestConfig) {
  // Destructure requestConfig for clarity
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
    const [formDataResult, contentType] = _d1(body);
    if (requestConfig.contentType == null) headers.push("content-type", contentType);
    body = formDataResult.stream;
    contentLength = formDataResult.length;
  } else if (E4.isBlobLike(body) && requestConfig.contentType == null && body.type) {
    // Handle Blob-like bodies
    headers.push("content-type", body.type);
  }

  // If body is a stream with a .read method, call read(0) to prime isBlobOrFileLikeObject
  if (body && typeof body.read === "function") body.read(0);

  // Determine body length
  let calculatedBodyLength = E4.bodyLength(body);
  // Prefer calculated length, fallback to provided contentLength
  contentLength = calculatedBodyLength ?? contentLength;
  if (contentLength === null) contentLength = requestConfig.contentLength;
  // If no body and method doesn'processRuleBeginHandlers allow body, set contentLength to null
  if (contentLength === 0 && !methodAllowsBody) contentLength = null;

  // Validate contentLength for certain methods
  if (
    isNonIdempotentHttpMethod(method) &&
    contentLength > 0 &&
    requestConfig.contentLength !== null &&
    requestConfig.contentLength !== contentLength
  ) {
    // If duplicate request detected, error out
    if (client[yd1]) {
      E4.errorRequest(client, requestConfig, new b_());
      return false;
    }
    // Otherwise, emit a warning
    process.emitWarning(new b_());
  }

  // Get the socket for this request
  const socket = client[Nh];

  /**
   * Handles aborting the request and cleaning up resources.
   * @param {Error} [error] - Optional error to report.
   */
  const handleAbort = (error) => {
    if (requestConfig.aborted || requestConfig.completed) return;
    E4.errorRequest(client, requestConfig, error || new kh0());
    E4.destroy(body);
    E4.destroy(socket, new Uh("aborted"));
  };

  // Try to run the onConnect callback
  try {
    requestConfig.onConnect(handleAbort);
  } catch (err) {
    E4.errorRequest(client, requestConfig, err);
  }

  // If aborted during onConnect, do not proceed
  if (requestConfig.aborted) return false;

  // Set socket flags based on method and options
  if (method === "HEAD") socket[nY] = true;
  if (upgrade || method === "CONNECT") socket[nY] = true;
  if (reset != null) socket[nY] = reset;
  if (client[Ph0] && socket[YX6]++ >= client[Ph0]) socket[nY] = true;
  if (blocking) socket[Fr] = true;

  // Build the HTTP request headers string
  let headerString = `${method} ${path} HTTP/1.1\r\n`;
  if (typeof host === "string") {
    headerString += `host: ${host}\r\n`;
  } else {
    headerString += client[BX6];
  }

  if (upgrade) {
    headerString += `connection: upgrade\r\nupgrade: ${upgrade}\r\n`;
  } else if (client[AY1] && !socket[nY]) {
    headerString += `connection: keep-alive\r\n`;
  } else {
    headerString += `connection: close\r\n`;
  }

  // Append all headers from the headers array
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
      request: requestConfig,
      headers: headerString,
      socket
    });
  }

  // Send the request body using the appropriate method based on its type
  if (!body || calculatedBodyLength === 0) {
    // No body or empty body
    sendHttpRequestBody(handleAbort, null, client, requestConfig, socket, contentLength, headerString, methodAllowsBody);
  } else if (E4.isBuffer(body)) {
    // Buffer body
    sendHttpRequestBody(handleAbort, body, client, requestConfig, socket, contentLength, headerString, methodAllowsBody);
  } else if (E4.isBlobLike(body)) {
    // Blob body
    if (typeof body.stream === "function") {
      streamIteratorToSocket(handleAbort, body.stream(), client, requestConfig, socket, contentLength, headerString, methodAllowsBody);
    } else {
      sendBlobBodyWithHeaders(handleAbort, body, client, requestConfig, socket, contentLength, headerString, methodAllowsBody);
    }
  } else if (E4.isStream(body)) {
    // Stream body
    pipeStreamBodyToSocket(handleAbort, body, client, requestConfig, socket, contentLength, headerString, methodAllowsBody);
  } else if (E4.isIterable(body)) {
    // Iterable body
    streamIteratorToSocket(handleAbort, body, client, requestConfig, socket, contentLength, headerString, methodAllowsBody);
  } else {
    // Unknown body type
    l9(false);
  }

  return true;
}

module.exports = sendHttpRequestOverSocket;