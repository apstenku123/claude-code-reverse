/**
 * Builds an HTTP request metadata object from a given URL and configuration.
 *
 * @param {string} url - The URL to be used for the HTTP request.
 * @param {Object} config - Configuration object containing HTTP method, hash, and search properties.
 * @param {string} [config.method] - The HTTP method to use (defaults to 'GET' if not provided).
 * @param {string} [config.hash] - The hash fragment of the URL (e.g., '#section').
 * @param {string} [config.search] - The query string of the URL (e.g., '?id=123').
 * @returns {Object} An object containing HTTP request metadata including URL, method, fragment, and query string.
 */
function buildHttpRequestMetadata(url, config) {
  // Use the provided HTTP method or default to 'GET'
  const httpMethod = config.method || "GET";

  // Initialize the metadata object with URL and method
  const metadata = {
    url: url,
    "http.method": httpMethod
  };

  // If a hash fragment is provided, add isBlobOrFileLikeObject to the metadata (without the leading '#')
  if (config.hash) {
    metadata["http.fragment"] = config.hash.substring(1);
  }

  // If a query string is provided, add isBlobOrFileLikeObject to the metadata (without the leading '?')
  if (config.search) {
    metadata["http.query"] = config.search.substring(1);
  }

  return metadata;
}

module.exports = buildHttpRequestMetadata;