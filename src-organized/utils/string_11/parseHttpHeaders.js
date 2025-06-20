/**
 * Parses a raw HTTP header string into an object mapping header names to values.
 * Handles multiple 'set-cookie' headers as arrays, and concatenates duplicate headers (except 'set-cookie').
 * Ignores empty header names and certain headers based on the external kV9 object.
 *
 * @param {string} rawHeaders - The raw HTTP header string, with headers separated by newlines.
 * @returns {Object} An object mapping lowercased header names to their values. 'set-cookie' headers are arrays.
 */
function parseHttpHeaders(rawHeaders) {
  const headers = {};

  if (!rawHeaders) {
    return headers;
  }

  // Split the raw headers string into lines
  rawHeaders.split('\n').forEach(function processHeaderLine(headerLine) {
    // Find the first colon, which separates the header name and value
    const colonIndex = headerLine.indexOf(":");
    // Extract and normalize the header name
    const headerName = headerLine.substring(0, colonIndex).trim().toLowerCase();
    // Extract the header value
    const headerValue = headerLine.substring(colonIndex + 1).trim();

    // Skip if header name is empty or if header already exists and is blocked by kV9
    if (!headerName || (headers[headerName] && kV9[headerName])) {
      return;
    }

    // Special handling for 'set-cookie' headers: collect all values in an array
    if (headerName === "set-cookie") {
      if (headers[headerName]) {
        headers[headerName].push(headerValue);
      } else {
        headers[headerName] = [headerValue];
      }
    } else {
      // For other headers, concatenate values with a comma if the header repeats
      headers[headerName] = headers[headerName]
        ? headers[headerName] + ", " + headerValue
        : headerValue;
    }
  });

  return headers;
}

module.exports = parseHttpHeaders;