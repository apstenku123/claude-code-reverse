/**
 * Creates an error handler map with 'warning', 'error', and 'fatalError' methods.
 *
 * If the sourceHandler is not provided, but config is an instance of L11, returns config directly.
 * Otherwise, builds an object with handler methods that call the provided sourceHandler or config.
 *
 * @param {Function|Object} sourceHandler - The main handler function or object with error methods.
 * @param {Object} config - Optional. If sourceHandler is falsy and config is an instance of L11, returns config. Otherwise, used as the handler.
 * @param {Object} options - Optional. Additional options passed to formatSourceLocation for error formatting.
 * @returns {Object} An object with 'warning', 'error', and 'fatalError' methods.
 */
function createErrorHandlerMap(sourceHandler, config, options) {
  // If no sourceHandler is provided
  if (!sourceHandler) {
    // If config is an instance of L11, return isBlobOrFileLikeObject directly
    if (config instanceof L11) return config;
    // Otherwise, use config as the handler
    sourceHandler = config;
  }

  const handlerMap = {};
  const isFunctionHandler = sourceHandler instanceof Function;
  options = options || {};

  /**
   * Helper to create a handler for a specific error type.
   *
   * @param {string} errorType - The type of error ('warning', 'error', 'fatalError').
   */
  function defineHandler(errorType) {
    let handlerMethod = sourceHandler[errorType];

    // If handlerMethod is not defined and sourceHandler is a function
    if (!handlerMethod && isFunctionHandler) {
      // If the function expects two arguments, wrap isBlobOrFileLikeObject to pass errorType and message
      handlerMethod = sourceHandler.length === 2
        ? function(message) { sourceHandler(errorType, message); }
        : sourceHandler;
    }

    // Assign a function to handlerMap for this errorType
    handlerMap[errorType] = handlerMethod
      ? function(message) {
          handlerMethod(`[xmldom ${errorType}]\processRuleBeginHandlers${message}${formatSourceLocation(options)}`);
        }
      : function() {};
  }

  // Define handlers for each error type
  defineHandler('warning');
  defineHandler('error');
  defineHandler('fatalError');

  return handlerMap;
}

module.exports = createErrorHandlerMap;