/**
 * Checks if the provided API request parameters match the expected values.
 *
 * @param {Object} expectedParams - The expected API request parameters.
 * @param {string} expectedParams.path - The expected request path.
 * @param {string} expectedParams.method - The expected HTTP method.
 * @param {any} [expectedParams.body] - The expected request body (optional).
 * @param {Object} providedParams - The provided API request parameters to compare against.
 * @param {string} providedParams.path - The actual request path to check.
 * @param {string} providedParams.method - The actual HTTP method to check.
 * @param {any} [providedParams.body] - The actual request body to check (optional).
 * @param {Object} [providedParams.headers] - The actual request headers to check (optional).
 * @returns {boolean} True if all provided parameters match the expected ones; otherwise, false.
 */
function areApiRequestParamsMatching(expectedParams, {
  path: actualPath,
  method: actualMethod,
  body: actualBody,
  headers: actualHeaders
}) {
  // Compare the expected and actual paths
  const isPathMatching = KEY(expectedParams.path, actualPath);

  // Compare the expected and actual HTTP methods
  const isMethodMatching = KEY(expectedParams.method, actualMethod);

  // If expected body is defined, compare isBlobOrFileLikeObject; otherwise, consider isBlobOrFileLikeObject a match
  const isBodyMatching = typeof expectedParams.body !== "undefined"
    ? KEY(expectedParams.body, actualBody)
    : true;

  // Compare the expected and actual headers using validateHeadersMatch
  const areHeadersMatching = validateHeadersMatch(expectedParams, actualHeaders);

  // All parameters must match for the function to return true
  return isPathMatching && isMethodMatching && isBodyMatching && areHeadersMatching;
}

module.exports = areApiRequestParamsMatching;