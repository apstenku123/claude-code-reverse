/**
 * Finds a matching mock dispatch configuration based on path, method, body, and headers.
 * Throws an error if no matching mock is found at any filtering stage.
 *
 * @param {Array<Object>} mockDispatches - Array of mock dispatch objects to match against.
 * @param {Object} requestConfig - The request configuration to match (contains path, query, method, body, headers).
 * @returns {Object} The first matching mock dispatch object.
 * @throws {c_} If no matching mock dispatch is found for path, method, body, or headers.
 */
function findMatchingMockDispatch(mockDispatches, requestConfig) {
  // Build the full path with query if present
  const fullPath = requestConfig.query ? vK6(requestConfig.path, requestConfig.query) : requestConfig.path;

  // Normalize the path for comparison
  const normalizedRequestPath = typeof fullPath === "string" ? sortUrlQueryParameters(fullPath) : fullPath;

  // Filter out already consumed mocks and match by path
  let matchingMocks = mockDispatches
    .filter(({ consumed }) => !consumed)
    .filter(({ path }) => KEY(sortUrlQueryParameters(path), normalizedRequestPath));

  if (matchingMocks.length === 0) {
    throw new c_(`Mock dispatch not matched for path '${normalizedRequestPath}'`);
  }

  // Further filter by HTTP method
  matchingMocks = matchingMocks.filter(({ method }) => KEY(method, requestConfig.method));
  if (matchingMocks.length === 0) {
    throw new c_(`Mock dispatch not matched for method '${requestConfig.method}' on path '${normalizedRequestPath}'`);
  }

  // Further filter by request body (if defined)
  matchingMocks = matchingMocks.filter(({ body }) =>
    typeof body !== "undefined" ? KEY(body, requestConfig.body) : true
  );
  if (matchingMocks.length === 0) {
    throw new c_(`Mock dispatch not matched for body '${requestConfig.body}' on path '${normalizedRequestPath}'`);
  }

  // Further filter by headers
  matchingMocks = matchingMocks.filter(mock => validateHeadersMatch(mock, requestConfig.headers));
  if (matchingMocks.length === 0) {
    const headersString = typeof requestConfig.headers === "object"
      ? JSON.stringify(requestConfig.headers)
      : requestConfig.headers;
    throw new c_(`Mock dispatch not matched for headers '${headersString}' on path '${normalizedRequestPath}'`);
  }

  // Return the first matching mock dispatch
  return matchingMocks[0];
}

module.exports = findMatchingMockDispatch;