/**
 * Handles HTTP response status and content length, updating the provided trace/span object accordingly.
 * If a response is present in the config, sets the HTTP status and content length attribute (if available).
 * If an error is present, sets the status to 'internal_error'.
 * Always ends the trace/span.
 *
 * @param {object} traceSpan - The trace or span object to update (must support setAttribute, setStatus, and end methods).
 * @param {object} httpResult - Object containing either a 'response' (with status and headers) or an 'error'.
 * @returns {void}
 */
function handleHttpResponseStatus(traceSpan, httpResult) {
  if (httpResult.response) {
    // Set the HTTP status code on the trace/span
    uH.setHttpStatus(traceSpan, httpResult.response.status);

    // Attempt to get the 'content-length' header from the response
    const contentLengthHeader = httpResult.response.headers && httpResult.response.headers.get("content-length");
    if (contentLengthHeader) {
      const contentLength = parseInt(contentLengthHeader, 10);
      // Only set the attribute if content length is a positive integer
      if (contentLength > 0) {
        traceSpan.setAttribute("http.response_content_length", contentLength);
      }
    }
  } else if (httpResult.error) {
    // Set status to internal error if an error is present
    traceSpan.setStatus("internal_error");
  }
  // Always end the trace/span
  traceSpan.end();
}

module.exports = handleHttpResponseStatus;
