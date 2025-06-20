/**
 * Builds a request signature string and determines its type (route or url) based on the provided request object and configuration.
 *
 * @param {Object} request - The request object containing method, route, url, etc.
 * @param {Object} [options={}] - Optional configuration for customizing the route and method.
 * @param {string} [options.customRoute] - a custom route string to use instead of the default.
 * @param {string} [options.method] - If set, forces inclusion of the HTTP method in the signature.
 * @param {string} [options.path] - If set, forces inclusion of the path in the signature.
 * @returns {[string, string]} An array where the first element is the request signature string and the second is the type ("route" or "url").
 */
function buildRequestSignatureAndType(request, options = {}) {
  // Determine the HTTP method in uppercase, if present
  const httpMethod = request.method && request.method.toUpperCase();

  let signatureType = "url";
  let signaturePath = "";

  // Determine the signature path and its type
  if (options.customRoute || request.route) {
    // Use custom route if provided, otherwise build from baseUrl and route.path
    signaturePath = options.customRoute || `${request.baseUrl || ""}${request.route && request.route.path}`;
    signatureType = "route";
  } else if (request.originalUrl || request.url) {
    // Use the originalUrl or url, stripped of query and fragment
    signaturePath = _p2.stripUrlQueryAndFragment(request.originalUrl || request.url || "");
  }

  let signatureString = "";

  // Optionally include the HTTP method in the signature
  if (options.method && httpMethod) {
    signatureString += httpMethod;
  }
  // Add a space if both method and path are present
  if (options.method && options.path) {
    signatureString += " ";
  }
  // Append the path if present
  if (options.path && signaturePath) {
    signatureString += signaturePath;
  }

  return [signatureString, signatureType];
}

module.exports = buildRequestSignatureAndType;