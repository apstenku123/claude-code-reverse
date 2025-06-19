/**
 * Handles the preparation and sending of an HTTP request, including headers, body processing, and connection management.
 * Supports various body types (FormData, Blob, Buffer, Stream, Iterable), manages headers, and handles abort/reset/upgrade logic.
 *
 * @param {object} client - The client or connection object to send the request through.
 * @param {object} createRequestOptions - The request configuration object containing method, path, headers, body, etc.
 * @returns {boolean} Returns true if the request was initiated, false if aborted or errored.
 */
function handleHttpRequest(client, createRequestOptions) {
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
    let [formDataResult, formContentType] = _d1(body);
    if (createRequestOptions.contentType == null) headers.push("content-type", formContentType);
    body = formDataResult.stream;
    contentLength = formDataResult.length;
  } else if (E4.isBlobLike(body) && createRequestOptions.contentType == null && body.type) {
    // Handle Blob-like bodies
    headers.push("content-type", body.type);
  }

  // If the body has a read method, call isBlobOrFileLikeObject with 0 (possibly to initialize)
  if (body && typeof body.read === "function") {
    body.read(0);
  }

  // Determine the body length
  let calculatedBodyLength = E4.bodyLength(body);
  contentLength = calculatedBodyLength ?? contentLength;
  if (contentLength === null) contentLength = createRequestOptions.contentLength;
  if (contentLength === 0 && !methodAllowsBody) contentLength = null;

  // Validate content length for certain methods
  if (
    isNonIdempotentHttpMethod(method) &&
    contentLength > 0 &&
    createRequestOptions.contentLength !== null &&
    createRequestOptions.contentLength !== contentLength
  ) {
    if (client[yd1]) {
      E4.errorRequest(client, createRequestOptions, new b_());
      return false;
    }
    process.emitWarning(new b_());
  }

  // Get the socket or connection object
  let socket = client[Nh];

  // Error/abort handler
  const onAbortOrError = (error) => {
    if (createRequestOptions.aborted || createRequestOptions.completed) return;
    E4.errorRequest(client, createRequestOptions, error || new kh0());
    E4.destroy(body);
    E4.destroy(socket, new Uh("aborted"));
  };

  // Call onConnect handler
  try {
    createRequestOptions.onConnect(onAbortOrError);
  } catch (connectError) {
    E4.errorRequest(client, createRequestOptions, connectError);
  }

  if (createRequestOptions.aborted) return false;

  // Set socket flags based on method and options
  if (method === "HEAD") socket[nY] = true;
  if (upgrade || method === "CONNECT") socket[nY] = true;
  if (reset != null) socket[nY] = reset;
  if (client[Ph0] && socket[YX6]++ >= client[Ph0]) socket[nY] = true;
  if (blocking) socket[Fr] = true;

  // Build the HTTP request headers
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

  // Append all custom headers
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

  // Publish headers if there are subscribers
  if (Oh0.sendHeaders.hasSubscribers) {
    Oh0.sendHeaders.publish({
      request: createRequestOptions,
      headers: headerString,
      socket: socket
    });
  }

  // Send the request body using the appropriate handler based on its type
  if (!body || calculatedBodyLength === 0) {
    sendHttpRequestBody(onAbortOrError, null, client, createRequestOptions, socket, contentLength, headerString, methodAllowsBody);
  } else if (E4.isBuffer(body)) {
    sendHttpRequestBody(onAbortOrError, body, client, createRequestOptions, socket, contentLength, headerString, methodAllowsBody);
  } else if (E4.isBlobLike(body)) {
    if (typeof body.stream === "function") {
      streamIteratorToSocket(onAbortOrError, body.stream(), client, createRequestOptions, socket, contentLength, headerString, methodAllowsBody);
    } else {
      sendBlobBodyWithHeaders(onAbortOrError, body, client, createRequestOptions, socket, contentLength, headerString, methodAllowsBody);
    }
  } else if (E4.isStream(body)) {
    pipeStreamBodyToSocket(onAbortOrError, body, client, createRequestOptions, socket, contentLength, headerString, methodAllowsBody);
  } else if (E4.isIterable(body)) {
    streamIteratorToSocket(onAbortOrError, body, client, createRequestOptions, socket, contentLength, headerString, methodAllowsBody);
  } else {
    l9(false);
  }

  return true;
}

module.exports = handleHttpRequest;