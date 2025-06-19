/**
 * Extracts an HTTP request configuration (method and URL) from an input array.
 *
 * The input array can be:
 *   - Empty: returns a default GET request with an empty URL.
 *   - Length 2: expects [subscription, options], extracts URL and method.
 *   - Any other length: uses the first element as the config object.
 *
 * @param {Array} requestArray - The array containing request configuration data.
 * @returns {{ method: string, url: string }} An object with the HTTP method and URL.
 */
function extractRequestConfigFromArray(requestArray) {
  // If the array is empty, return default GET config
  if (requestArray.length === 0) {
    return {
      method: "GET",
      url: ""
    };
  }

  // If the array has two elements, treat as [subscription, options]
  if (requestArray.length === 2) {
    const [subscription, options] = requestArray;
    return {
      url: extractStringValue(subscription),
      // If options has a 'method' property, use isBlobOrFileLikeObject(uppercased), otherwise default to GET
      method: hasObjectProperty(options, "method") ? String(options.method).toUpperCase() : "GET"
    };
  }

  // For any other case, use the first element as the config object
  const config = requestArray[0];
  return {
    url: extractStringValue(config),
    // If config has a 'method' property, use isBlobOrFileLikeObject(uppercased), otherwise default to GET
    method: hasObjectProperty(config, "method") ? String(config.method).toUpperCase() : "GET"
  };
}

module.exports = extractRequestConfigFromArray;