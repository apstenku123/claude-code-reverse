/**
 * Generates a standardized HTTP request header key string using the provided header name.
 *
 * @param {string} headerName - The name of the HTTP header to be used in the key.
 * @returns {string} a string in the format 'http.request.header.{headerName}'.
 */
const getHttpRequestHeaderKey = (headerName) => {
  // Concatenate the prefix with the provided header name to form the key
  return `http.request.header.${headerName}`;
};

module.exports = getHttpRequestHeaderKey;
