/**
 * Initiates an optional access request by starting a child transaction for an HTTP client operation.
 *
 * @param {Observable} sourceObservable - The source observable to attach the child transaction to.
 * @param {Object} config - Configuration object for the HTTP request. Should contain at least a 'method' property.
 * @param {string} requestUrl - The URL to be parsed and used for the HTTP request.
 * @returns {*} The result of invoking A41 with the constructed parameters, typically a new observable with the child transaction attached.
 */
function requestOptionalAccess(sourceObservable, config, requestUrl) {
  // Parse the request URL into its components
  const parsedUrl = VP.parseUrl(requestUrl);
  // Use the provided HTTP method or default to 'GET'
  const httpMethod = config.method || "GET";
  // Prepare the data object for the transaction
  const transactionData = {
    "http.method": httpMethod
  };
  // Include query string if present
  if (parsedUrl.search) {
    transactionData["http.query"] = parsedUrl.search;
  }
  // Include fragment/hash if present
  if (parsedUrl.hash) {
    transactionData["http.fragment"] = parsedUrl.hash;
  }
  // Start a child transaction for the HTTP client operation
  return A41([
    sourceObservable,
    "optionalAccess",
    // createCompatibleVersionChecker is a function that starts a child transaction
    startChild => startChild({
      op: "http.client",
      origin: "auto.http.node.undici",
      description: `${httpMethod} ${VP.getSanitizedUrlString(parsedUrl)}`,
      data: transactionData
    })
  ]);
}

module.exports = requestOptionalAccess;