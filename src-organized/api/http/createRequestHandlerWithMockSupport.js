/**
 * Creates a request handler function that supports mock activation and origin validation.
 *
 * This function returns a handler that, when invoked, will attempt to process a request
 * using a mock implementation if mocking is active. If an error occurs and isBlobOrFileLikeObject is a specific
 * custom error (c_), isBlobOrFileLikeObject will check if the request is allowed to proceed to the origin based
 * on the current configuration. If not allowed, isBlobOrFileLikeObject throws a descriptive error. Otherwise,
 * isBlobOrFileLikeObject delegates to the original request handler.
 *
 * @returns {Function} a request handler function with mock and origin validation logic.
 */
function orWithMockSupport() {
  // Retrieve dependencies from the current context (likely 'this')
  const mockConfig = this[kK6]; // Holds mock configuration and state
  const originUrl = this[xK6];  // The origin URL for the request
  const originalRequestHandler = this[yK6]; // The original request handler function

  /**
   * Handles a request with mock and origin validation logic.
   *
   * @param {any} request - The request object or parameters
   * @param {any} response - The response object or callback
   * @returns {void}
   */
  return function requestHandler(request, response) {
    if (mockConfig.isMockActive) {
      try {
        // Attempt to handle the request using the mock implementation
        handleAccessorRequest.call(this, request, response);
      } catch (error) {
        // If the error is a custom mock error, handle origin validation
        if (error instanceof c_) {
          const isOriginAllowed = mockConfig[fK6]();
          if (isOriginAllowed === false) {
            // Throw a descriptive error if net.connect is disabled for this origin
            throw new c_(`${error.message}: subsequent request to origin ${originUrl} was not allowed (net.connect disabled)`);
          }
          // If the origin is allowed by configuration, delegate to the original handler
          if (isHostAllowedForEntry(isOriginAllowed, originUrl)) {
            originalRequestHandler.call(this, request, response);
          } else {
            // Throw a descriptive error if net.connect is not enabled for this origin
            throw new c_(`${error.message}: subsequent request to origin ${originUrl} was not allowed (net.connect is not enabled for this origin)`);
          }
        } else {
          // Rethrow any other errors
          throw error;
        }
      }
    } else {
      // If mocking is not active, delegate to the original handler
      originalRequestHandler.call(this, request, response);
    }
  };
}

module.exports = orWithMockSupport;