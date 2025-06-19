/**
 * Extracts selected properties from an HTTP request object based on configuration options.
 *
 * @param {Object} request - The HTTP request object to extract data from.
 * @param {Object} [options] - Configuration options for extraction.
 * @param {Array<string>} [options.include=kp2] - List of properties to include in the result.
 * @param {any} [options.deps] - Optional dependencies for query string extraction.
 * @returns {Object} An object containing the extracted request data as specified by the include array.
 */
function extractRequestData(request, options) {
  // Destructure include and deps from options, with defaults
  const {
    include: propertiesToInclude = kp2,
    deps: queryDeps
  } = options || {};

  const extractedData = {};
  const requestHeaders = request.headers || {};
  const requestMethod = request.method;

  // Determine the host name
  const hostName = requestHeaders.host || request.hostname || request.host || "<no host>";

  // Determine the protocol (http or https)
  const protocol = (request.protocol === "https" || (request.socket && request.socket.encrypted)) ? "https" : "http";

  // Determine the original URL
  const originalUrl = request.originalUrl || request.url || "";

  // Construct the full URL if necessary
  const fullUrl = originalUrl.startsWith(protocol)
    ? originalUrl
    : `${protocol}://${hostName}${originalUrl}`;

  // Iterate over each property to include in the result
  propertiesToInclude.forEach((property) => {
    switch (property) {
      case "headers": {
        // Include headers, but remove cookies if not explicitly requested
        extractedData.headers = requestHeaders;
        if (!propertiesToInclude.includes("cookies")) {
          delete extractedData.headers.cookie;
        }
        break;
      }
      case "method": {
        extractedData.method = requestMethod;
        break;
      }
      case "url": {
        extractedData.url = fullUrl;
        break;
      }
      case "cookies": {
        // Prefer cookies from request.cookies, else parse from headers if present
        extractedData.cookies = request.cookies || (requestHeaders.cookie && Op2.parseCookie(requestHeaders.cookie)) || {};
        break;
      }
      case "query_string": {
        // Use external extractQueryStringFromRequest to extract query string, passing dependencies if needed
        extractedData.query_string = extractQueryStringFromRequest(request, queryDeps);
        break;
      }
      case "data": {
        // Only include data for non-GET/HEAD requests
        if (requestMethod === "GET" || requestMethod === "HEAD") {
          break;
        }
        if (request.body !== undefined) {
          extractedData.data = L5A.isString(request.body)
            ? request.body
            : JSON.stringify(Sp2.normalize(request.body));
        }
        break;
      }
      default: {
        // For any other property, include isBlobOrFileLikeObject if isBlobOrFileLikeObject exists directly on the request object
        if (Object.prototype.hasOwnProperty.call(request, property)) {
          extractedData[property] = request[property];
        }
      }
    }
  });

  return extractedData;
}

module.exports = extractRequestData;