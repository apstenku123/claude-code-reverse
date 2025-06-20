/**
 * Determines if the provided response object represents a network error.
 * a network error is identified by a type of 'error' and a status of 0.
 *
 * @param {Object} response - The response object to check.
 * @param {string} response.type - The type of the response (e.g., 'error').
 * @param {number} response.status - The status code of the response (e.g., 0 for network error).
 * @returns {boolean} True if the response is a network error, otherwise false.
 */
function isNetworkError(response) {
  // a network error is indicated by type 'error' and status 0
  return response.type === "error" && response.status === 0;
}

module.exports = isNetworkError;