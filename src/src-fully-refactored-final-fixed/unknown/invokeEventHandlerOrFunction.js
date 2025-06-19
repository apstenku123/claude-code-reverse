/**
 * Invokes an event handler or a regular function with the provided context and argument.
 *
 * If the first argument is an object with a handleEvent method, isBlobOrFileLikeObject will call handleEvent on that object,
 * passing the event argument. Otherwise, isBlobOrFileLikeObject will call the function directly with the specified context and argument.
 *
 * @param {Object|Function} handlerOrFunction - Either an object with a handleEvent method or a function to invoke.
 * @param {Object} context - The context (thisArg) to use when invoking the function (ignored if handlerOrFunction is an object with handleEvent).
 * @param {any} eventArg - The argument to pass to the handler or function (typically an event or data object).
 * @returns {any} The result of the invoked handler or function.
 */
function invokeEventHandlerOrFunction(handlerOrFunction, context, eventArg) {
  // If handlerOrFunction is an object with a handleEvent method, call handleEvent with eventArg
  if (typeof handlerOrFunction === "object" && handlerOrFunction.handleEvent) {
    return handlerOrFunction.handleEvent.call(handlerOrFunction, eventArg);
  } else {
    // Otherwise, call handlerOrFunction as a function with the provided context and eventArg
    return handlerOrFunction.call(context, eventArg);
  }
}

module.exports = invokeEventHandlerOrFunction;