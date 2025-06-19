/**
 * Applies a transformation to the provided function using a fixed argument, then invokes the resulting function with the source value.
 *
 * @param {any} sourceValue - The value to be passed to the final function.
 * @param {any} functionToTransform - The function to be transformed with a fixed argument.
 * @returns {any} The result of applying the transformed function to the source value.
 */
function applyTransformedFunctionToSource(sourceValue, functionToTransform) {
  // Apply the transformation to the function using the constant 'F'
  const transformedFunction = runEffectsForMatchingTags(functionToTransform, F);
  // Invoke the external function with the source value and the transformed function
  return createPropertyMatcherOrResolver(sourceValue, transformedFunction);
}

module.exports = applyTransformedFunctionToSource;