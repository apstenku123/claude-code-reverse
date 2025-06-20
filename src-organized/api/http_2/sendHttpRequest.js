/**
 * Sends an HTTP request using the provided configuration, applying request and response transforms,
 * and handling errors including request cancellation.
 *
 * @param {Object} requestConfig - The configuration object for the HTTP request.
 * @param {Object} requestConfig.headers - The headers for the request.
 * @param {string} requestConfig.method - The HTTP method (e.g., 'get', 'post').
 * @param {Function|Array<Function>} requestConfig.transformRequest - Function(createInteractionAccessor) to transform the request data.
 * @param {Function|Array<Function>} requestConfig.transformResponse - Function(createInteractionAccessor) to transform the response data.
 * @param {string|Function} [requestConfig.adapter] - Optional adapter to use for the request.
 * @returns {Promise<Object>} - a promise that resolves with the response object or rejects with an error.
 */
function sendHttpRequest(requestConfig) {
  // Ensure the request configuration is valid
  checkForCancellationOrAbort(requestConfig);

  // Normalize headers using D3 utility
  requestConfig.headers = D3.from(requestConfig.headers);

  // Transform request data using provided transformRequest function(createInteractionAccessor)
  requestConfig.data = mergeConfigObjects.call(requestConfig, requestConfig.transformRequest);

  // Set Content-Type header for methods that send a body
  const methodsWithBody = ["post", "put", "patch"];
  if (methodsWithBody.indexOf(requestConfig.method) !== -1) {
    requestConfig.headers.setContentType("application/x-www-form-urlencoded", false);
  }

  // Get the appropriate adapter (e.g., XHR, HTTP) and send the request
  return g41.getAdapter(requestConfig.adapter || Nx.adapter)(requestConfig)
    .then(
      /**
       * Success handler: transforms response data and headers.
       * @param {Object} response - The HTTP response object.
       * @returns {Object} - The transformed response object.
       */
      function handleSuccess(response) {
        // Re-validate the request configuration
        checkForCancellationOrAbort(requestConfig);
        // Transform response data
        response.data = mergeConfigObjects.call(requestConfig, requestConfig.transformResponse, response);
        // Normalize response headers
        response.headers = D3.from(response.headers);
        return response;
      },
      /**
       * Error handler: transforms error response data and headers if not a cancellation.
       * @param {Object} error - The error object.
       * @returns {Promise<never>} - a rejected promise with the error.
       */
      function handleError(error) {
        // If the error is not a cancelled request
        if (!isRequestCancelled(error)) {
          // Re-validate the request configuration
          checkForCancellationOrAbort(requestConfig);
          // If the error has a response, transform its data and headers
          if (error && error.response) {
            error.response.data = mergeConfigObjects.call(requestConfig, requestConfig.transformResponse, error.response);
            error.response.headers = D3.from(error.response.headers);
          }
        }
        // Reject the promise with the error
        return Promise.reject(error);
      }
    );
}

module.exports = sendHttpRequest;