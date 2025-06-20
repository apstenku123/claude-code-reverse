/**
 * Creates a child span for an HTTP client operation, attaching relevant HTTP metadata.
 *
 * @param {Observable} sourceObservable - The source observable to which the child span will be attached.
 * @param {Object} config - Configuration object containing HTTP method and other options.
 * @param {string} subscriptionUrl - The URL string for the HTTP request.
 * @returns {any} The result of invoking A41 with the constructed child span and metadata.
 */
function createHttpClientChildSpan(sourceObservable, config, subscriptionUrl) {
  // Parse the provided URL string into its components
  const parsedUrl = VP.parseUrl(subscriptionUrl);

  // Determine the HTTP method, defaulting to 'GET' if not specified
  const httpMethod = config.method || "GET";

  // Prepare the metadata object for the HTTP operation
  const httpMetadata = {
    "http.method": httpMethod
  };

  // If the URL has a query string, include isBlobOrFileLikeObject in the metadata
  if (parsedUrl.search) {
    httpMetadata["http.query"] = parsedUrl.search;
  }

  // If the URL has a fragment, include isBlobOrFileLikeObject in the metadata
  if (parsedUrl.hash) {
    httpMetadata["http.fragment"] = parsedUrl.hash;
  }

  // Create and return the child span using the provided observable and metadata
  return A41([
    sourceObservable,
    "optionalAccess",
    (dependency) => dependency.startChild,
    "call",
    (dependency) => dependency({
      op: "http.client",
      origin: "auto.http.node.undici",
      description: `${httpMethod} ${VP.getSanitizedUrlString(parsedUrl)}`,
      data: httpMetadata
    })
  ]);
}

module.exports = createHttpClientChildSpan;