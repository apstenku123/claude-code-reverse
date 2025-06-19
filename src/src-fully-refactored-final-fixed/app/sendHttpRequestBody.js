/**
 * Sends the HTTP request body and headers to the provided writable stream, handling different body types and content length validation.
 *
 * @param {Function} handleError - Callback to handle any errors that occur during sending.
 * @param {Buffer|string|null} requestBody - The body of the HTTP request. Can be a Buffer, string, or null/undefined for no body.
 * @param {Object} requestContext - Context object for the request, must have a method keyed by requestSentCallbackKey.
 * @param {Object} requestHandler - Handler object with methods for request lifecycle events (onBodySent, onRequestSent, reset property).
 * @param {Object} writableStream - Writable stream to send the request to (must support write, cork, uncork).
 * @param {number|null} contentLength - The Content-Length of the request body, or null if not specified.
 * @param {string} headerPrefix - String to prepend to the header lines (e.g., "").
 * @param {boolean} isReplay - Indicates if this is a replayed request (affects handler state).
 * @returns {void}
 */
function sendHttpRequestBody(
  handleError,
  requestBody,
  requestContext,
  requestHandler,
  writableStream,
  contentLength,
  headerPrefix,
  isReplay
) {
  try {
    // If there is no body to send
    if (!requestBody) {
      if (contentLength === 0) {
        // No body and content-length is 0: write header with content-length 0
        writableStream.write(`${headerPrefix}content-length: 0\r\n\r\n`, "latin1");
      } else {
        // No body and no content-length: ensure this is valid, then write header only
        l9(contentLength === null, "no body must not have content length");
        writableStream.write(`${headerPrefix}\r\n`, "latin1");
      }
    } else if (E4.isBuffer(requestBody)) {
      // Body is a Buffer: validate content-length, cork stream, write headers and body, then uncork
      l9(contentLength === requestBody.byteLength, "buffer body must have content length");
      writableStream.cork();
      writableStream.write(`${headerPrefix}content-length: ${contentLength}\r\n\r\n`, "latin1");
      writableStream.write(requestBody);
      writableStream.uncork();
      requestHandler.onBodySent(requestBody);
      // If not a replay and handler reset is not explicitly false, set handler state
      if (!isReplay && requestHandler.reset !== false) {
        requestHandler[nY] = true;
      }
    }
    // Notify handler that the request has been sent
    requestHandler.onRequestSent();
    // Call the request sent callback from the context
    requestContext[IR]();
  } catch (error) {
    handleError(error);
  }
}

module.exports = sendHttpRequestBody;