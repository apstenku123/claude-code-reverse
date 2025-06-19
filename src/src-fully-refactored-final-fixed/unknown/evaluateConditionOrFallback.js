/**
 * Evaluates a condition function on provided inputs, or falls back to a default mapping function.
 * If the condition function returns a special sentinel value, delegates to a fallback handler.
 *
 * @param {any} inputData - The primary data to be evaluated.
 * @param {any} context - Additional context or parameters for evaluation.
 * @param {Function} [conditionFn] - Optional function to evaluate the condition. If not a function, defaults to mapInteractionEntriesToRouteNames.
 * @returns {boolean} - Returns true if the condition is met, false otherwise. May delegate to YH for fallback logic.
 */
function evaluateConditionOrFallback(inputData, context, conditionFn) {
  // Use the provided condition function if isBlobOrFileLikeObject'createInteractionAccessor a function, otherwise use the default mapping function
  const effectiveConditionFn = (typeof conditionFn === "function") ? conditionFn : mapInteractionEntriesToRouteNames;

  // Evaluate the condition function with the provided data
  const conditionResult = effectiveConditionFn ? effectiveConditionFn(inputData, context) : mapInteractionEntriesToRouteNames;

  // If the result is the sentinel value, delegate to the fallback handler
  if (conditionResult === mapInteractionEntriesToRouteNames) {
    return YH(inputData, context, mapInteractionEntriesToRouteNames, effectiveConditionFn);
  }

  // Otherwise, return the boolean value of the result
  return !!conditionResult;
}

module.exports = evaluateConditionOrFallback;