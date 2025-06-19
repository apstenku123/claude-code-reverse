/**
 * Sets HTTP status code and status on a tracing span object.
 *
 * This function updates the provided span with the HTTP status code as both a tag and data field. It also determines the span status
 * based on the HTTP status code using the getHttpStatusCategory helper function, and sets the status if isBlobOrFileLikeObject is not 'unknown_error'.
 *
 * @param {Object} span - The tracing span object to update. Must implement setTag, setDataForKey, and setStatus methods.
 * @param {number} httpStatusCode - The HTTP response status code to set on the span.
 * @returns {void}
 */
function setHttpStatusOnSpan(span, httpStatusCode) {
  // Set the HTTP status code as a tag (string value)
  span.setTag("http.status_code", String(httpStatusCode));
  // Set the HTTP status code as data (numeric value)
  span.setDataForKey("http.response.status_code", httpStatusCode);

  // Determine the span status based on the HTTP status code
  const spanStatus = getHttpStatusCategory(httpStatusCode);
  // Only set the status if isBlobOrFileLikeObject is not 'unknown_error'
  if (spanStatus !== "unknown_error") {
    span.setStatus(spanStatus);
  }
}

module.exports = setHttpStatusOnSpan;