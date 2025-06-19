/**
 * Builds a unique request identifier string and determines the identifier type (either 'route' or 'url').
 *
 * The identifier is constructed based on the provided request object and optional configuration.
 * If a custom route or route information is present, the identifier is based on the route; otherwise, isBlobOrFileLikeObject uses the URL (with query and fragment stripped).
 * The method and path from the config can be included in the identifier string for further specificity.
 *
 * @param {Object} request - The request object containing method, route, baseUrl, originalUrl, and url properties.
 * @param {Object} [options={}] - Optional configuration object. Can include customRoute, method, and path properties.
 * @returns {[string, string]} a tuple: [identifierString, identifierType], where identifierType is either 'route' or 'url'.
 */
function buildRequestIdentifier(request, options = {}) {
  // Determine HTTP method in uppercase (if present)
  const httpMethod = request.method && request.method.toUpperCase();

  let identifierString = "";
  let identifierType = "url";

  // Determine the identifier string and its type
  if (options.customRoute || request.route) {
    // Use custom route if provided, otherwise build from baseUrl and route.path
    identifierString = options.customRoute || `${request.baseUrl || ""}${request.route && request.route.path}`;
    identifierType = "route";
  } else if (request.originalUrl || request.url) {
    // Use URL, stripping query and fragment
    identifierString = _p2.stripUrlQueryAndFragment(request.originalUrl || request.url || "");
  }

  let requestId = "";

  // Optionally prepend HTTP method
  if (options.method && httpMethod) {
    requestId += httpMethod;
  }
  // Add a space if both method and path are present
  if (options.method && options.path) {
    requestId += " ";
  }
  // Append the identifier string if path and identifier are present
  if (options.path && identifierString) {
    requestId += identifierString;
  }

  return [requestId, identifierType];
}

module.exports = buildRequestIdentifier;