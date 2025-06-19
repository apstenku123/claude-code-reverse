/**
 * Processes and sends an HTTP request with transformed data and headers, then handles the response.
 *
 * @param {Object} requestConfig - The configuration object for the HTTP request.
 * @returns {Promise<Object>} - a promise that resolves with the processed response or rejects with an error.
 */
function sendTransformedRequest(requestConfig) {
  // Ensure request configuration is valid (side effect)
  checkForCancellationOrAbort(requestConfig);

  // Normalize headers using D3 utility
  requestConfig.headers = D3.from(requestConfig.headers);

  // Transform request data using provided transformation function
  requestConfig.data = mergeConfigObjects.call(requestConfig, requestConfig.transformRequest);

  // Set Content-Type for specific HTTP methods
  const methodsRequiringContentType = ["post", "put", "patch"];
  if (methodsRequiringContentType.indexOf(requestConfig.method) !== -1) {
    requestConfig.headers.setContentType("application/x-www-form-urlencoded", false);
  }

  // Select the appropriate adapter (e.g., xhr, http) and send the request
  return g41.getAdapter(requestConfig.adapter || Nx.adapter)(requestConfig)
    .then(
      /**
       * Success handler: process response data and headers
       * @param {Object} response - The HTTP response object
       * @returns {Object} - The processed response object
       */
      function handleSuccess(response) {
        // Re-validate request configuration (side effect)
        checkForCancellationOrAbort(requestConfig);
        // Transform response data
        response.data = mergeConfigObjects.call(requestConfig, requestConfig.transformResponse, response);
        // Normalize response headers
        response.headers = D3.from(response.headers);
        return response;
      },
      /**
       * Error handler: process error response if not a cancellation
       * @param {Object} error - The error object
       * @returns {Promise<never>} - a rejected promise with the error
       */
      function handleError(error) {
        // If the error is not a cancelled request
        if (!isRequestCancelled(error)) {
          // Re-validate request configuration (side effect)
          checkForCancellationOrAbort(requestConfig);
          // If error has a response, transform its data and headers
          if (error && error.response) {
            error.response.data = mergeConfigObjects.call(requestConfig, requestConfig.transformResponse, error.response);
            error.response.headers = D3.from(error.response.headers);
          }
        }
        return Promise.reject(error);
      }
    );
}

module.exports = sendTransformedRequest;
