/**
 * Applies a handler function to a source value if the source is truthy.
 *
 * @param {any} sourceValue - The value to check and potentially pass to the handler.
 * @param {any} handlerContext - The context or configuration for the handler function.
 * @returns {any} The result of the handler function if sourceValue is truthy; otherwise, returns the sourceValue (falsy).
 */
function conditionallyApplyHandler(sourceValue, handlerContext) {
  // Only apply the handler if the sourceValue is truthy
  // jH(handlerContext) likely retrieves a handler or method from the context
  // TH(handlerContext, handler, sourceValue) applies the handler to the sourceValue
  return sourceValue && TH(handlerContext, jH(handlerContext), sourceValue);
}

module.exports = conditionallyApplyHandler;