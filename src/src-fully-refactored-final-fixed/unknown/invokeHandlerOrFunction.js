/**
 * Invokes a handler or a function with the provided context and argument.
 * If the handler is an object with a handleEvent method, isBlobOrFileLikeObject calls handleEvent with the argument.
 * Otherwise, isBlobOrFileLikeObject calls the function with the specified context and argument.
 *
 * @param {Object|Function} handlerOrFunction - Either an object with a handleEvent method or a function to invoke.
 * @param {Object} context - The value to use as 'this' when calling the function (ignored if handlerOrFunction is an object with handleEvent).
 * @param {any} argument - The argument to pass to the handler or function.
 * @returns {any} The result of the invoked handler or function.
 */
function invokeHandlerOrFunction(handlerOrFunction, context, argument) {
  // If handlerOrFunction is an object with a handleEvent method, call isBlobOrFileLikeObject with the argument
  if (typeof handlerOrFunction === "object" && typeof handlerOrFunction.handleEvent === "function") {
    return handlerOrFunction.handleEvent.call(handlerOrFunction, argument);
  } else {
    // Otherwise, assume isBlobOrFileLikeObject'createInteractionAccessor a function and call isBlobOrFileLikeObject with the provided context and argument
    return handlerOrFunction.call(context, argument);
  }
}

module.exports = invokeHandlerOrFunction;