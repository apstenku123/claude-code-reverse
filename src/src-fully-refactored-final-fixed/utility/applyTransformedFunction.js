/**
 * Applies a transformation to the input value using a provided function, then processes the result with another function.
 *
 * @param {any} inputValue - The value to be transformed and processed.
 * @param {Function} transformFunction - The function used to transform the input value.
 * @returns {any} The result of processing the transformed input value.
 */
function applyTransformedFunction(inputValue, transformFunction) {
  // Apply the transformation function to the input value
  const transformedValue = runEffectsForMatchingTags(transformFunction, F);
  // Process the original input value with the transformed value
  return createPropertyMatcherOrResolver(inputValue, transformedValue);
}

module.exports = applyTransformedFunction;