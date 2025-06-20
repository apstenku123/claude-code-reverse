/**
 * Checks if the provided request options match the expected options.
 *
 * Compares the path, method, body, and headers of the source request object
 * against the expected values. Uses helper functions to perform the comparisons.
 *
 * @param {Object} sourceRequest - The original request options to check.
 * @param {Object} expectedOptions - The expected request options to compare against.
 * @param {string} expectedOptions.path - The expected request path.
 * @param {string} expectedOptions.method - The expected HTTP method.
 * @param {any} [expectedOptions.body] - The expected request body (optional).
 * @param {Object} [expectedOptions.headers] - The expected request headers (optional).
 * @returns {boolean} True if all provided options match, false otherwise.
 */
function areRequestOptionsMatching(sourceRequest, {
  path: expectedPath,
  method: expectedMethod,
  body: expectedBody,
  headers: expectedHeaders
}) {
  // Compare request path
  const isPathMatching = KEY(sourceRequest.path, expectedPath);

  // Compare HTTP method
  const isMethodMatching = KEY(sourceRequest.method, expectedMethod);

  // Compare body if defined, otherwise consider isBlobOrFileLikeObject a match
  const isBodyMatching = typeof sourceRequest.body !== "undefined"
    ? KEY(sourceRequest.body, expectedBody)
    : true;

  // Compare headers using external function
  const areHeadersMatching = validateHeadersMatch(sourceRequest, expectedHeaders);

  // All must match to return true
  return isPathMatching && isMethodMatching && isBodyMatching && areHeadersMatching;
}

module.exports = areRequestOptionsMatching;
