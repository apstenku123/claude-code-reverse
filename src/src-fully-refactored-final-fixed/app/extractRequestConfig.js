/**
 * Extracts an HTTP request configuration (method and URL) from the provided input array.
 *
 * The input array can be:
 *   - Empty: returns default GET method and empty URL.
 *   - Length 2: expects [subscription, options] and extracts URL and method.
 *   - Any other: uses the first element as config and extracts URL and method.
 *
 * @param {Array} requestInputArray - Array containing request configuration data.
 * @returns {{ method: string, url: string }} - An object with HTTP method and URL.
 */
function extractRequestConfig(requestInputArray) {
  // If the input array is empty, return default GET method and empty URL
  if (requestInputArray.length === 0) {
    return {
      method: "GET",
      url: ""
    };
  }

  // If the input array has exactly two elements, treat as [subscription, options]
  if (requestInputArray.length === 2) {
    const [subscription, options] = requestInputArray;
    return {
      url: extractStringValue(subscription),
      // Use method from options if present, otherwise default to GET
      method: hasObjectProperty(options, "method") ? String(options.method).toUpperCase() : "GET"
    };
  }

  // For any other case, use the first element as config
  const config = requestInputArray[0];
  return {
    url: extractStringValue(config),
    // Use method from config if present, otherwise default to GET
    method: hasObjectProperty(config, "method") ? String(config.method).toUpperCase() : "GET"
  };
}

module.exports = extractRequestConfig;