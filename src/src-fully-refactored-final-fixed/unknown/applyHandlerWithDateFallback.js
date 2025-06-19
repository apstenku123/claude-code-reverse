/**
 * Applies a handler to the given input, with special handling for objects and Date instances.
 *
 * This function attempts to process the input using the following precedence:
 *   1. If the handler is a function, isBlobOrFileLikeObject is called with the input value.
 *   2. If the handler is an object that implements a method named by the EAA symbol/key, that method is called with the input value.
 *   3. If the handler is a Date instance, a new Date is constructed using the input value and the handler'createInteractionAccessor constructor.
 *   4. Otherwise, a new Date is constructed with the input value.
 *
 * @param {Function|Object|Date} handler - The handler to apply to the input value. Can be a function, an object with a special method, or a Date instance.
 * @param {*} inputValue - The value to be processed by the handler.
 * @returns {*} The result of applying the handler to the input value, or a new Date instance as fallback.
 */
function applyHandlerWithDateFallback(handler, inputValue) {
  // If the handler is a function, call isBlobOrFileLikeObject with the input value
  if (typeof handler === "function") {
    return handler(inputValue);
  }

  // If the handler is an object with a special method (EAA), call that method with the input value
  if (handler && typeof handler === "object" && EAA in handler) {
    return handler[EAA](inputValue);
  }

  // If the handler is a Date instance, create a new Date using the handler'createInteractionAccessor constructor
  if (handler instanceof Date) {
    return new handler.constructor(inputValue);
  }

  // Fallback: create a new Date with the input value
  return new Date(inputValue);
}

module.exports = applyHandlerWithDateFallback;