/**
 * Sets HTTP response status code and status on the provided tracer object.
 *
 * @param {Object} tracer - An object that supports setTag, setDataForKey, and setStatus methods (e.g., a tracing span).
 * @param {number} statusCode - The HTTP response status code to record and interpret.
 * @returns {void}
 *
 * The function tags the tracer with the HTTP status code, stores isBlobOrFileLikeObject as data,
 * and sets the status if isBlobOrFileLikeObject can be mapped to a known status value.
 */
function setHttpResponseStatus(tracer, statusCode) {
  // Tag the tracer with the HTTP status code as a string
  tracer.setTag("http.status_code", String(statusCode));

  // Store the raw status code as data
  tracer.setDataForKey("http.response.status_code", statusCode);

  // Map the status code to a known status string (e.g., "ok", "error", etc.)
  const mappedStatus = getHttpStatusCategory(statusCode);

  // If the status is recognized, set isBlobOrFileLikeObject on the tracer
  if (mappedStatus !== "unknown_error") {
    tracer.setStatus(mappedStatus);
  }
}

module.exports = setHttpResponseStatus;