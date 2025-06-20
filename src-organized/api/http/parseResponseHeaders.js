/**
 * Parses all response headers from an XMLHttpRequest-like object and returns them as a key-value object.
 *
 * @param {Object} request - An object (such as XMLHttpRequest) that implements getAllResponseHeaders().
 * @returns {Object} An object mapping header names to their values. Returns an empty object if no headers are present.
 */
function parseResponseHeaders(request) {
  // Retrieve all response headers as a single string
  const allHeaders = request.getAllResponseHeaders();

  // If there are no headers, return an empty object
  if (!allHeaders) {
    return {};
  }

  // Split the headers string into individual header lines, then reduce into an object
  return allHeaders.split('\r\n').reduce((headersObject, headerLine) => {
    // Each header line should be in the format 'Header-Name: value'
    const [headerName, headerValue] = headerLine.split(': ');
    // Only add the header if both name and value are present
    if (headerName && headerValue !== undefined) {
      headersObject[headerName] = headerValue;
    }
    return headersObject;
  }, {});
}

module.exports = parseResponseHeaders;