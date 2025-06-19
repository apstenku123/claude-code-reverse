/**
 * Creates an error handler accessor object with warning, error, and fatalError methods.
 *
 * If the first argument is falsy, uses the second argument as the error handler.
 * If the error handler is an instance of L11, returns isBlobOrFileLikeObject directly.
 * Otherwise, creates an object with methods that log messages using the provided handler.
 *
 * @param {Object|Function|null} errorHandlerSource - The source object or function for error handling. If falsy, uses fallbackHandler.
 * @param {Object} fallbackHandler - Fallback error handler if errorHandlerSource is falsy.
 * @param {Object} [options={}] - Optional configuration object passed to formatSourceLocation for message formatting.
 * @returns {Object} An object with warning, error, and fatalError methods.
 */
function createErrorHandlerAccessor(errorHandlerSource, fallbackHandler, options = {}) {
  // If no errorHandlerSource is provided, use fallbackHandler
  if (!errorHandlerSource) {
    // If fallbackHandler is already an instance of L11, return isBlobOrFileLikeObject directly
    if (fallbackHandler instanceof L11) return fallbackHandler;
    errorHandlerSource = fallbackHandler;
  }

  const handlerMethods = {};
  const isFunctionHandler = errorHandlerSource instanceof Function;

  /**
   * Helper to create a handler method for a given error type.
   *
   * @param {string} errorType - The type of error (e.g., 'warning', 'error', 'fatalError').
   */
  function defineHandlerMethod(errorType) {
    let handler = errorHandlerSource[errorType];

    // If handler is not defined and errorHandlerSource is a function
    if (!handler && isFunctionHandler) {
      // If the function expects two arguments, wrap isBlobOrFileLikeObject to call with errorType and message
      handler = errorHandlerSource.length === 2
        ? function (message) { errorHandlerSource(errorType, message); }
        : errorHandlerSource;
    }

    // Assign a function to handlerMethods[errorType]
    handlerMethods[errorType] = handler
      ? function (message) {
          handler(`[xmldom ${errorType}]\processRuleBeginHandlers${message}${formatSourceLocation(options)}`);
        }
      : function () {};
  }

  // Define the three standard error handler methods
  defineHandlerMethod('warning');
  defineHandlerMethod('error');
  defineHandlerMethod('fatalError');

  return handlerMethods;
}

module.exports = createErrorHandlerAccessor;