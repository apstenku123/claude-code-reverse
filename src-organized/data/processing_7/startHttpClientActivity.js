/**
 * Starts an HTTP client activity span for tracing, attaching relevant HTTP metadata.
 *
 * @param {Observable} sourceObservable - The source observable to which the activity is attached.
 * @param {Object} config - Configuration object, may contain the HTTP method.
 * @param {string} url - The URL string to be parsed and traced.
 * @returns {any} The result of invoking A41 with the constructed activity child.
 */
function startHttpClientActivity(sourceObservable, config, url) {
  // Parse the provided URL using the VP utility
  const parsedUrl = VP.parseUrl(url);
  // Determine the HTTP method, defaulting to 'GET' if not specified
  const httpMethod = config.method || "GET";

  // Prepare the data object with HTTP metadata
  const httpData = {
    "http.method": httpMethod
  };

  // Attach query string if present
  if (parsedUrl.search) {
    httpData["http.query"] = parsedUrl.search;
  }
  // Attach fragment if present
  if (parsedUrl.hash) {
    httpData["http.fragment"] = parsedUrl.hash;
  }

  // Start a child activity span for the HTTP client operation
  return A41([
    sourceObservable,
    "optionalAccess",
    // createCompatibleVersionChecker is a function that starts a child activity span
    activityContext => activityContext.startChild,
    "call",
    activityContext => activityContext({
      op: "http.client",
      origin: "auto.http.node.undici",
      description: `${httpMethod} ${VP.getSanitizedUrlString(parsedUrl)}`,
      data: httpData
    })
  ]);
}

module.exports = startHttpClientActivity;