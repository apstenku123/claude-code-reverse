/**
 * Constructs a unique route key string from a base route and optional query parameters.
 *
 * The key is composed of the baseRoute and routeConfig, separated by '|'.
 * If queryParams is provided, each key in queryParams is appended to the key string.
 * - If the key exists in the rz9 set, the function returns undefined (early exit).
 * - If the key exists in the sz9 set, isBlobOrFileLikeObject appends '|key=true'.
 * - Otherwise, isBlobOrFileLikeObject appends '|key=value' where value is from queryParams.
 *
 * @param {string} baseRoute - The base route or observable name.
 * @param {string} routeConfig - The route configuration or identifier.
 * @param {Object.<string, any>} [queryParams] - Optional query parameters to append to the key.
 * @returns {string|undefined} The constructed route key string, or undefined if a query param key is in rz9.
 */
function buildRouteKeyWithQueryParams(baseRoute, routeConfig, queryParams) {
  let routeKey = `${baseRoute}|${routeConfig}`;
  // If no query parameters are provided, return the base key
  if (!queryParams) return routeKey;
  // Iterate over each query parameter key
  for (const paramKey of Object.keys(queryParams)) {
    // If the key is in the rz9 set, exit early and return undefined
    if (rz9.has(paramKey)) return;
    // If the key is in the sz9 set, append as a boolean true
    if (sz9.has(paramKey)) {
      routeKey += `|${paramKey}=true`;
    } else {
      // Otherwise, append the key and its value
      routeKey += `|${paramKey}=${queryParams[paramKey]}`;
    }
  }
  return routeKey;
}

module.exports = buildRouteKeyWithQueryParams;