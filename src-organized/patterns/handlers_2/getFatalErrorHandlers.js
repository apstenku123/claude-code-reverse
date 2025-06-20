/**
 * Returns an object containing warning, error, and fatalError handler functions.
 *
 * If no handler source is provided, but the config is an instance of L11, returns the config directly.
 * Otherwise, builds handler functions that call the corresponding methods on the handler source,
 * or, if the handler source is a function, wraps isBlobOrFileLikeObject appropriately for each handler type.
 *
 * @param {Object|Function} handlerSource - The object or function providing handler methods (warning, error, fatalError).
 * @param {Object} config - Optional configuration or fallback handler object.
 * @param {Object} [options={}] - Optional options object passed to formatSourceLocation for additional context.
 * @returns {Object} An object with warning, error, and fatalError handler functions.
 */
function getFatalErrorHandlers(handlerSource, config, options = {}) {
  // If no handlerSource is provided, but config is an instance of L11, return config directly
  if (!handlerSource) {
    if (config instanceof L11) return config;
    handlerSource = config;
  }

  const handlers = {};
  const isFunctionSource = handlerSource instanceof Function;

  /**
   * Helper to create a handler for a given type (warning, error, fatalError)
   * @param {string} handlerType
   */
  function createHandler(handlerType) {
    let handlerMethod = handlerSource[handlerType];

    // If no direct method, but handlerSource is a function, wrap isBlobOrFileLikeObject accordingly
    if (!handlerMethod && isFunctionSource) {
      handlerMethod = handlerSource.length === 2
        ? function (message) { handlerSource(handlerType, message); }
        : handlerSource;
    }

    // Assign a handler function, or a no-op if none found
    handlers[handlerType] = handlerMethod
      ? function (message) {
          handlerMethod(`[xmldom ${handlerType}]\processRuleBeginHandlers${message}${formatSourceLocation(options)}`);
        }
      : function () {};
  }

  // Create handlers for each type
  createHandler("warning");
  createHandler("error");
  createHandler("fatalError");

  return handlers;
}

module.exports = getFatalErrorHandlers;