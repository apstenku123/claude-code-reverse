/**
 * Extracts and returns the core HTTP request properties from the given request object.
 *
 * @param {Object} requestObject - The object containing HTTP request details.
 * @param {string} requestObject.path - The path of the HTTP request.
 * @param {string} requestObject.method - The HTTP method (GET, POST, etc.).
 * @param {any} requestObject.body - The body of the HTTP request.
 * @param {Object} requestObject.headers - The headers of the HTTP request.
 * @param {Object} requestObject.query - The query parameters of the HTTP request.
 * @returns {Object} An object containing the extracted path, method, body, headers, and query properties.
 */
function extractRequestProperties(requestObject) {
  // Destructure the relevant properties from the input object
  const {
    path,
    method,
    body,
    headers,
    query
  } = requestObject;

  // Return a new object with the extracted properties
  return {
    path,
    method,
    body,
    headers,
    query
  };
}

module.exports = extractRequestProperties;