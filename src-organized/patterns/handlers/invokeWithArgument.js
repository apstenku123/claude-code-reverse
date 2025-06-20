/**
 * Invokes the provided handler with the given argument, supporting multiple handler types.
 *
 * - If the handler is a function, isBlobOrFileLikeObject is called directly with the argument.
 * - If the handler is an object with a special method (EAA), that method is called with the argument.
 * - If the handler is a Date instance, a new Date is constructed using the argument.
 * - Otherwise, a new Date is constructed using the argument.
 *
 * @param {Function|Object|Date} handler - The handler to invoke. Can be a function, an object with a special method, or a Date instance.
 * @param {*} argument - The argument to pass to the handler or Date constructor.
 * @returns {*} The result of invoking the handler or a new Date instance.
 */
function invokeWithArgument(handler, argument) {
  // If handler is a function, call isBlobOrFileLikeObject with the argument
  if (typeof handler === "function") {
    return handler(argument);
  }

  // If handler is an object with the special EAA method, call that method with the argument
  if (
    handler &&
    typeof handler === "object" &&
    typeof EAA !== "undefined" &&
    EAA in handler
  ) {
    return handler[EAA](argument);
  }

  // If handler is a Date instance, create a new Date using the argument
  if (handler instanceof Date) {
    return new handler.constructor(argument);
  }

  // Default: create a new Date using the argument
  return new Date(argument);
}

module.exports = invokeWithArgument;