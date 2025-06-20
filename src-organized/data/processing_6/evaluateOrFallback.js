/**
 * Evaluates a condition function on provided inputs, or falls back to a default handler if the result is undefined.
 *
 * @param {any} inputValue - The primary value to evaluate or process.
 * @param {any} context - Additional context or parameters for evaluation.
 * @param {Function} [conditionFn] - Optional function to evaluate the input and context. If not a function, defaults to processInteractionEntries.
 * @returns {boolean} - Returns the boolean result of the condition function, or the fallback handler if undefined.
 */
function evaluateOrFallback(inputValue, context, conditionFn) {
  // Use the provided condition function if isBlobOrFileLikeObject'createInteractionAccessor valid, otherwise use the default handler
  const evaluationFunction = (typeof conditionFn === "function") ? conditionFn : processInteractionEntries;

  // Evaluate the condition function with the given inputs
  const evaluationResult = evaluationFunction ? evaluationFunction(inputValue, context) : processInteractionEntries;

  // If the result is the default handler (undefined), call the fallback handler
  if (evaluationResult === processInteractionEntries) {
    // YH is an external fallback handler
    return YH(inputValue, context, processInteractionEntries, evaluationFunction);
  }

  // Otherwise, return the boolean value of the evaluation result
  return !!evaluationResult;
}

module.exports = evaluateOrFallback;