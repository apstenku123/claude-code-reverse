/**
 * Invokes the provided handler function with the specified arguments.
 *
 * @function invokeHandlerWithArguments
 * @description Calls the handlerFunction with the provided handlerArguments. This is a simple wrapper to abstract the invocation logic.
 * @param {Function} handlerFunction - The function to be invoked.
 * @param {...any} handlerArguments - The arguments to pass to the handlerFunction.
 * @returns {any} The return value of the handlerFunction.
 */
function invokeHandlerWithArguments(handlerFunction, ...handlerArguments) {
  // Call the handler function with the provided arguments
  return handlerFunction(...handlerArguments);
}

module.exports = invokeHandlerWithArguments;