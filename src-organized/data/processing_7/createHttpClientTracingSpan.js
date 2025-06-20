/**
 * Creates a tracing span for an HTTP client request using the provided configuration and subscription URL.
 * This function parses the URL, constructs relevant HTTP metadata, and starts a tracing child span
 * for observability and monitoring purposes.
 *
 * @param {Observable} sourceObservable - The source observable or tracing context to attach the span to.
 * @param {Object} config - Configuration object for the HTTP request (should include the HTTP method).
 * @param {string} subscriptionUrl - The URL for the HTTP request to be traced.
 * @returns {any} The result of invoking A41 with the constructed tracing span.
 */
function createHttpClientTracingSpan(sourceObservable, config, subscriptionUrl) {
  // Parse the provided URL using the VP utility
  const parsedUrl = VP.parseUrl(subscriptionUrl);

  // Determine the HTTP method, defaulting to 'GET' if not specified
  const httpMethod = config.method || "GET";

  // Prepare the data object with HTTP metadata for tracing
  const httpData = {
    "http.method": httpMethod
  };

  // Include query string if present
  if (parsedUrl.search) {
    httpData["http.query"] = parsedUrl.search;
  }

  // Include fragment/hash if present
  if (parsedUrl.hash) {
    httpData["http.fragment"] = parsedUrl.hash;
  }

  // Start a tracing child span with the constructed metadata
  return A41([
    sourceObservable,
    "optionalAccess",
    tracingContext => tracingContext.startChild,
    "call",
    tracingContext => tracingContext({
      op: "http.client",
      origin: "auto.http.node.undici",
      description: `${httpMethod} ${VP.getSanitizedUrlString(parsedUrl)}`,
      data: httpData
    })
  ]);
}

module.exports = createHttpClientTracingSpan;