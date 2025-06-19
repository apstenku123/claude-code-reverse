/**
 * Creates a request configuration object by extracting and transforming headers from the input request options.
 *
 * @param {Object} createRequestOptions - The original request options containing method, url, and headers.
 * @param {string} createRequestOptions.method - The HTTP method (e.g., 'GET', 'POST').
 * @param {string} createRequestOptions.url - The request URL.
 * @param {Object} createRequestOptions.headers - The headers object to be transformed.
 * @returns {Object} a new object containing the method, url, and processed headers.
 */
function createRequestConfig(createRequestOptions) {
  // Transform the headers using the external T5A function
  const processedHeaders = T5A(createRequestOptions.headers);

  // Return a new configuration object with method, url, and processed headers
  return {
    method: createRequestOptions.method,
    url: createRequestOptions.url,
    headers: processedHeaders
  };
}

module.exports = createRequestConfig;