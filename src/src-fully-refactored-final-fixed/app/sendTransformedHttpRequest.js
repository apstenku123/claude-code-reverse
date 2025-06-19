/**
 * Processes and sends an HTTP request with transformed data and headers, then handles the response.
 *
 * @param {Object} requestConfig - The configuration object for the HTTP request.
 * @param {Object} requestConfig.headers - The initial headers for the request.
 * @param {string} requestConfig.method - The HTTP method (e.g., 'post', 'put', 'patch').
 * @param {Function|Array<Function>} requestConfig.transformRequest - Function(createInteractionAccessor) to transform the request data.
 * @param {Function|Array<Function>} requestConfig.transformResponse - Function(createInteractionAccessor) to transform the response data.
 * @param {string|Function} [requestConfig.adapter] - Optional adapter for sending the request.
 * @param {any} requestConfig.data - The request payload.
 * @returns {Promise<Object>} a promise that resolves with the processed response object, or rejects with an error.
 */
function sendTransformedHttpRequest(requestConfig) {
  // Ensure request configuration is valid and normalize headers
  checkForCancellationOrAbort(requestConfig);
  requestConfig.headers = D3.from(requestConfig.headers);

  // Transform the request data using provided transformRequest function(createInteractionAccessor)
  requestConfig.data = mergeConfigObjects.call(requestConfig, requestConfig.transformRequest);

  // For methods that typically send a body, set the Content-Type header if not already set
  const methodsWithBody = ["post", "put", "patch"];
  if (methodsWithBody.indexOf(requestConfig.method) !== -1) {
    requestConfig.headers.setContentType("application/x-www-form-urlencoded", false);
  }

  // Select the appropriate adapter to send the request
  const adapter = g41.getAdapter(requestConfig.adapter || Nx.adapter);

  // Send the request and handle the response
  return adapter(requestConfig).then(
    /**
     * Success handler: transforms response data and headers
     * @param {Object} response - The HTTP response object
     * @returns {Object} The processed response object
     */
    function handleSuccess(response) {
      checkForCancellationOrAbort(requestConfig);
      response.data = mergeConfigObjects.call(requestConfig, requestConfig.transformResponse, response);
      response.headers = D3.from(response.headers);
      return response;
    },
    /**
     * Error handler: transforms error response data and headers if not a cancellation
     * @param {Object} error - The error object from the HTTP request
     * @returns {Promise<never>} a rejected promise with the processed error
     */
    function handleError(error) {
      if (!isRequestCancelled(error)) {
        checkForCancellationOrAbort(requestConfig);
        if (error && error.response) {
          error.response.data = mergeConfigObjects.call(requestConfig, requestConfig.transformResponse, error.response);
          error.response.headers = D3.from(error.response.headers);
        }
      }
      return Promise.reject(error);
    }
  );
}

module.exports = sendTransformedHttpRequest;
