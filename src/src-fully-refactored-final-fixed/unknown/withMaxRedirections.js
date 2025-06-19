/**
 * Wraps a handler function to enforce a maximum number of redirections.
 * If the maxRedirections limit is reached, the handler is called directly.
 * Otherwise, a redirection handler is created to manage further redirections.
 *
 * @param {Object} options - Configuration options.
 * @param {number} options.maxRedirections - The default maximum number of redirections allowed.
 * @returns {Function} a function that takes a handler and returns a wrapped handler enforcing redirection limits.
 */
function withMaxRedirections({ maxRedirections: defaultMaxRedirections }) {
  return function wrapHandler(handler) {
    /**
     * Handler wrapper that enforces the maxRedirections limit.
     *
     * @param {Object} requestConfig - The request configuration object.
     * @param {any} context - Additional context or callback for the handler.
     * @returns {any} The result of the handler or the redirection handler.
     */
    return function redirectionHandler(requestConfig, context) {
      // Destructure maxRedirections from requestConfig, defaulting to the provided default
      const { maxRedirections = defaultMaxRedirections } = requestConfig;

      // If no redirections are allowed, call the handler directly
      if (!maxRedirections) {
        return handler(requestConfig, context);
      }

      // Otherwise, create a new redirection handler to manage further redirections
      const redirectionManager = new aX6(handler, maxRedirections, requestConfig, context);

      // Call the handler with maxRedirections set to 0 to prevent further redirections
      const updatedRequestConfig = {
        ...requestConfig,
        maxRedirections: 0
      };
      return handler(updatedRequestConfig, redirectionManager);
    };
  };
}

module.exports = withMaxRedirections;