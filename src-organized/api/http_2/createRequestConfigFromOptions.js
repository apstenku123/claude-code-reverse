/**
 * Creates a request configuration object from the provided options.
 *
 * @param {Object} createRequestOptions - The options for the HTTP request.
 * @param {string} createRequestOptions.method - The HTTP method (e.g., 'GET', 'POST').
 * @param {string} createRequestOptions.url - The URL for the HTTP request.
 * @param {Object} createRequestOptions.headers - The headers for the HTTP request.
 * @returns {Object} The request configuration object with method, url, and processed headers.
 */
function createRequestConfigFromOptions(createRequestOptions) {
  // Process the headers using the external T5A function
  const processedHeaders = T5A(createRequestOptions.headers);

  // Return the configuration object for the HTTP request
  return {
    method: createRequestOptions.method,
    url: createRequestOptions.url,
    headers: processedHeaders
  };
}

module.exports = createRequestConfigFromOptions;