/**
 * Creates an error handler object with warning, error, and fatalError methods.
 *
 * If no sourceHandler is provided, and config is an instance of L11, returns config directly.
 * Otherwise, builds an object with methods that delegate to the corresponding methods on sourceHandler,
 * or, if sourceHandler is a function, wraps isBlobOrFileLikeObject appropriately. Each method logs messages with a prefix and extra context.
 *
 * @param {Object|Function} sourceHandler - The object or function providing error handling methods.
 * @param {Object} config - Optional configuration object or an instance of L11.
 * @param {Object} [options={}] - Additional options to be passed to formatSourceLocation for context.
 * @returns {Object} An object with warning, error, and fatalError methods.
 */
function createErrorHandler(sourceHandler, config, options = {}) {
  // If no sourceHandler is provided
  if (!sourceHandler) {
    // If config is an instance of L11, return isBlobOrFileLikeObject directly
    if (config instanceof L11) return config;
    // Otherwise, use config as the sourceHandler
    sourceHandler = config;
  }

  const errorHandler = {};
  const isFunctionHandler = sourceHandler instanceof Function;

  /**
   * Helper to create a handler method for a given error type.
   * @param {string} errorType - The type of error (e.g., 'warning', 'error', 'fatalError').
   */
  function defineHandler(errorType) {
    let handlerMethod = sourceHandler[errorType];

    // If handlerMethod is not defined and sourceHandler is a function
    if (!handlerMethod && isFunctionHandler) {
      // If the function expects two arguments, wrap isBlobOrFileLikeObject to call with errorType and message
      handlerMethod = sourceHandler.length === 2
        ? function(message) { sourceHandler(errorType, message); }
        : sourceHandler;
    }

    // Define the handler method on the errorHandler object
    errorHandler[errorType] = handlerMethod
      ? function(message) {
          handlerMethod(`[xmldom ${errorType}]\processRuleBeginHandlers${message}${formatSourceLocation(options)}`);
        }
      : function() {};
  }

  // Define all three handlers
  defineHandler('warning');
  defineHandler('error');
  defineHandler('fatalError');

  return errorHandler;
}

module.exports = createErrorHandler;