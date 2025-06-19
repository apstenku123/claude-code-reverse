/**
 * Retrieves the Content-Length value from HTTP headers if present.
 *
 * @param {Object} headers - An object representing HTTP headers. May contain 'Content-Length' or 'content-length'.
 * @returns {number|undefined} The Content-Length as an integer if found, otherwise undefined.
 */
function getContentLengthFromHeaders(headers) {
  if (headers) {
    // Check for both 'Content-Length' and 'content-length' header names (case-insensitive)
    const contentLengthValue = headers["Content-Length"] || headers["content-length"];
    if (contentLengthValue) {
      // Parse the header value as an integer (base 10)
      return parseInt(contentLengthValue, 10);
    }
  }
  // Return undefined if header is not present
  return undefined;
}

module.exports = getContentLengthFromHeaders;