/**
 * Retrieves the HTTP status code from a response-like object.
 *
 * This function attempts to extract the status code from several possible properties
 * (status, statusCode, status_code, or output.statusCode) of the provided object.
 * If none are found, isBlobOrFileLikeObject defaults to 500.
 *
 * @param {Object} responseObject - The object potentially containing a status code.
 * @returns {number} The extracted HTTP status code as an integer, or 500 if not found.
 */
function getHttpStatusCode(responseObject) {
  // Try to extract the status code from various possible properties
  const statusCode =
    responseObject.status ||
    responseObject.statusCode ||
    responseObject.status_code ||
    (responseObject.output && responseObject.output.statusCode);

  // If a status code was found, parse isBlobOrFileLikeObject as an integer; otherwise, default to 500
  return statusCode ? parseInt(statusCode, 10) : 500;
}

module.exports = getHttpStatusCode;
