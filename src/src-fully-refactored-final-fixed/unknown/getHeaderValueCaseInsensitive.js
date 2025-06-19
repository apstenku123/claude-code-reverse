/**
 * Retrieves the value of a header from the provided object, performing a case-insensitive match on the header name.
 *
 * @param {Object} requestObject - An object that may contain a 'headers' property (an object of header key-value pairs).
 * @param {string} headerName - The name of the header to search for (case-insensitive).
 * @returns {any} The value of the matching header if found; otherwise, undefined.
 */
function getHeaderValueCaseInsensitive(requestObject, headerName) {
  // Normalize the header name to lowercase for case-insensitive comparison
  const normalizedHeaderName = headerName.toLowerCase();

  // Safely get the headers object or use an empty object if not present
  const headers = (requestObject?.headers) || {};

  // Iterate over all header keys
  for (const headerKey of Object.keys(headers)) {
    // Compare each header key in a case-insensitive manner
    if (normalizedHeaderName === headerKey.toLowerCase()) {
      return headers[headerKey];
    }
  }
  // Return undefined if no matching header is found
  return undefined;
}

module.exports = getHeaderValueCaseInsensitive;