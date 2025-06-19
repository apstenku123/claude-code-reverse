/**
 * Builds a request signature string and determines the type of resource (route or url) based on input parameters.
 *
 * @param {Object} requestObject - The request object containing method, route, url, and other properties.
 * @param {Object} [options={}] - Optional configuration object that may contain customRoute, method, and path.
 * @returns {[string, string]} An array where the first element is the constructed request signature string, and the second is the resource type ('route' or 'url').
 */
function buildRequestSignature(requestObject, options = {}) {
  // Extract and normalize the HTTP method if present
  const httpMethod = requestObject.method && requestObject.method.toUpperCase();
  let resourceIdentifier = "";
  let resourceType = "url";

  // Determine the resource identifier and its type
  if (options.customRoute || requestObject.route) {
    // Use customRoute if provided, otherwise build from baseUrl and route.path
    resourceIdentifier = options.customRoute || `${requestObject.baseUrl || ""}${requestObject.route && requestObject.route.path}`;
    resourceType = "route";
  } else if (requestObject.originalUrl || requestObject.url) {
    // Use the originalUrl or url, stripped of query and fragment
    resourceIdentifier = _p2.stripUrlQueryAndFragment(requestObject.originalUrl || requestObject.url || "");
  }

  let signature = "";

  // Build the signature string based on options and available data
  if (options.method && httpMethod) {
    signature += httpMethod;
  }
  if (options.method && options.path) {
    signature += " ";
  }
  if (options.path && resourceIdentifier) {
    signature += resourceIdentifier;
  }

  return [signature, resourceType];
}

module.exports = buildRequestSignature;