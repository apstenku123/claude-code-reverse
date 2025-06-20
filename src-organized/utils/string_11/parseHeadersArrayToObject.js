/**
 * Parses an array of HTTP header strings into an object mapping header names to values.
 *
 * Each string in the input array should be in the format: "Header-Name: value".
 * Throws an error if a string is not in the correct format or if the header name is empty.
 *
 * @param {string[]} headersArray - An array of header strings in the format "Header-Name: value".
 * @returns {Object.<string, string>} An object where each key is a header name and each value is the corresponding header value.
 * @throws {Error} If a header string is not in the correct format or the header name is empty.
 */
function parseHeadersArrayToObject(headersArray) {
  const headersObject = {};
  for (const headerEntry of headersArray) {
    const colonIndex = headerEntry.indexOf(":");
    // Ensure the header string contains a colon separating name and value
    if (colonIndex === -1) {
      throw new Error(`Invalid header format: "${headerEntry}". Expected format: "Header-Name: value"`);
    }
    // Extract and trim the header name and value
    const headerName = headerEntry.substring(0, colonIndex).trim();
    const headerValue = headerEntry.substring(colonIndex + 1).trim();
    // Ensure the header name is not empty
    if (!headerName) {
      throw new Error(`Invalid header: "${headerEntry}". Header name cannot be empty.`);
    }
    headersObject[headerName] = headerValue;
  }
  return headersObject;
}

module.exports = parseHeadersArrayToObject;
