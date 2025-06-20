/**
 * Creates a request handler that manages mock activation and error handling for network requests.
 *
 * This function returns a handler that, when invoked, will attempt to process a network request.
 * If a mock is active, isBlobOrFileLikeObject tries to call the mock handler. If an error of type `c_` is thrown,
 * isBlobOrFileLikeObject checks whether a subsequent request to the origin is allowed based on the current configuration.
 * If not allowed, isBlobOrFileLikeObject throws a descriptive error. Otherwise, isBlobOrFileLikeObject delegates to the original handler.
 *
 * @returns {Function} Request handler function with enhanced mock/error logic
 */
function createMockedRequestHandler() {
  // Retrieve mock state, origin, and original handler from the current context
  const mockState = this[kK6];
  const origin = this[xK6];
  const originalHandler = this[yK6];

  /**
   * Handles a network request with mock/error logic.
   *
   * @param {any} request - The request object or parameters
   * @param {any} response - The response object or callback
   * @returns {any} The result of the handler invocation
   */
  return function handleRequest(request, response) {
    if (mockState.isMockActive) {
      try {
        // Attempt to call the mock handler
        handleAccessorRequest.call(this, request, response);
      } catch (error) {
        // If the error is a custom network error (c_), handle isBlobOrFileLikeObject
        if (error instanceof c_) {
          // Determine if subsequent requests to the origin are allowed
          const isAllowed = mockState[fK6]();
          if (isAllowed === false) {
            // Not allowed: throw a descriptive error
            throw new c_(`${error.message}: subsequent request to origin ${origin} was not allowed (net.connect disabled)`);
          }
          // If allowed and the origin is permitted, delegate to the original handler
          if (isHostAllowedForEntry(isAllowed, origin)) {
            originalHandler.call(this, request, response);
          } else {
            // Not enabled for this origin: throw a descriptive error
            throw new c_(`${error.message}: subsequent request to origin ${origin} was not allowed (net.connect is not enabled for this origin)`);
          }
        } else {
          // Rethrow any other errors
          throw error;
        }
      }
    } else {
      // If mock is not active, delegate to the original handler
      originalHandler.call(this, request, response);
    }
  };
}

module.exports = createMockedRequestHandler;
