/**
 * Checks if the given request properties (path, method, body, headers) match the expected values.
 *
 * @param {Object} sourceRequest - The source request object containing properties to compare.
 * @param {Object} expectedRequest - The expected request properties to match against.
 * @param {string} expectedRequest.path - The expected request path.
 * @param {string} expectedRequest.method - The expected HTTP method.
 * @param {any} [expectedRequest.body] - The expected request body (optional).
 * @param {Object} [expectedRequest.headers] - The expected request headers (optional).
 * @returns {boolean} True if all provided properties match, false otherwise.
 */
function areRequestPropertiesMatching(sourceRequest, {
  path: expectedPath,
  method: expectedMethod,
  body: expectedBody,
  headers: expectedHeaders
}) {
  // Compare the request path
  const isPathMatching = KEY(sourceRequest.path, expectedPath);

  // Compare the HTTP method
  const isMethodMatching = KEY(sourceRequest.method, expectedMethod);

  // Compare the request body if isBlobOrFileLikeObject is defined in the source
  const isBodyMatching = typeof sourceRequest.body !== "undefined"
    ? KEY(sourceRequest.body, expectedBody)
    : true;

  // Compare the headers
  const areHeadersMatching = validateHeadersMatch(sourceRequest, expectedHeaders);

  // Return true only if all properties match
  return isPathMatching && isMethodMatching && isBodyMatching && areHeadersMatching;
}

module.exports = areRequestPropertiesMatching;