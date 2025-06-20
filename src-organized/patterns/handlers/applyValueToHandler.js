/**
 * Applies a value to a handler, method, or constructor based on the handler'createInteractionAccessor type.
 *
 * If the handler is a function, isBlobOrFileLikeObject is called with the value.
 * If the handler is an object with a method named by the EAA symbol, that method is called with the value.
 * If the handler is a Date instance, a new Date is constructed using the value.
 * Otherwise, a new Date is constructed using the value.
 *
 * @param {Function|Object|Date} handler - The handler to apply the value to. Can be a function, an object with a special method, or a Date instance.
 * @param {*} value - The value to apply to the handler.
 * @returns {*} The result of applying the value to the handler, or a new Date instance if no other case matches.
 */
function applyValueToHandler(handler, value) {
  // If handler is a function, call isBlobOrFileLikeObject with the value
  if (typeof handler === "function") {
    return handler(value);
  }

  // If handler is an object with a special method (EAA), call that method with the value
  if (handler && typeof handler === "object" && EAA in handler) {
    return handler[EAA](value);
  }

  // If handler is a Date instance, create a new Date using the value
  if (handler instanceof Date) {
    return new handler.constructor(value);
  }

  // Fallback: create a new Date using the value
  return new Date(value);
}

module.exports = applyValueToHandler;