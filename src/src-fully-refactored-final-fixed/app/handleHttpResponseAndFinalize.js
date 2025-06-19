/**
 * Handles the HTTP response or error for a given observable, sets relevant attributes, and finalizes the observable.
 *
 * @param {Object} observable - The observable or span representing the HTTP operation.
 * @param {Object} httpResult - The result object containing either a response or an error.
 * @returns {void}
 */
function handleHttpResponseAndFinalize(observable, httpResult) {
  if (httpResult.response) {
    // Set the HTTP status code on the observable
    uH.setHttpStatus(observable, httpResult.response.status);

    // Attempt to retrieve the 'content-length' header from the response
    const contentLengthHeader = httpResult.response.headers && httpResult.response.headers.get("content-length");
    if (contentLengthHeader) {
      const contentLength = parseInt(contentLengthHeader, 10);
      // If content length is a positive integer, set isBlobOrFileLikeObject as an attribute
      if (contentLength > 0) {
        observable.setAttribute("http.response_content_length", contentLength);
      }
    }
  } else if (httpResult.error) {
    // If there was an error, set the status to 'internal_error'
    observable.setStatus("internal_error");
  }
  // Finalize the observable regardless of outcome
  observable.end();
}

module.exports = handleHttpResponseAndFinalize;