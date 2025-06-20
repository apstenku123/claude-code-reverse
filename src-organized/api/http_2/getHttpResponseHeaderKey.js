/**
 * Generates a standardized HTTP response header key string.
 *
 * @param {string} headerName - The name of the HTTP header to be appended.
 * @returns {string} The full HTTP response header key in the format 'http.response.header.{headerName}'.
 */
const getHttpResponseHeaderKey = (headerName) => {
  // Concatenate the base prefix with the provided header name
  return `http.response.header.${headerName}`;
};

module.exports = getHttpResponseHeaderKey;