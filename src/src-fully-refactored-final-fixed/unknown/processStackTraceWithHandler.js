/**
 * Processes a stack trace string using a provided handler function.
 *
 * @param {Function} stackTraceHandler - a function that processes the stack trace string and a numeric flag.
 * @param {Object} errorObject - An object that may contain a 'stack' property (typically an Error object).
 * @returns {any} The result of calling stackTraceHandler with the stack trace and the flag 1.
 */
function processStackTraceWithHandler(stackTraceHandler, errorObject) {
  // Use the stack property from errorObject if available, otherwise use an empty string
  const stackTrace = errorObject.stack || "";
  // Call the handler with the stack trace and a flag value of 1
  return stackTraceHandler(stackTrace, 1);
}

module.exports = processStackTraceWithHandler;