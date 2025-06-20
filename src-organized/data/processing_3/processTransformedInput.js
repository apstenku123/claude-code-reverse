/**
 * Processes the input data by applying a series of transformations and then executes a final operation.
 *
 * @param {any} inputData - The primary data or observable to be processed.
 * @param {any} transformationConfig - Configuration or parameters for the transformation pipeline.
 * @returns {any} The result of applying the final operation to the transformed input.
 */
function processTransformedInput(inputData, transformationConfig) {
  // Step 1: Apply the first transformation to the configuration
  const firstTransformation = getConfiguredIteratee(transformationConfig);

  // Step 2: Apply the second transformation to the result of the first
  const secondTransformation = l0(firstTransformation);

  // Step 3: Execute the final operation with the input data and the fully transformed config
  return Cq(inputData, secondTransformation);
}

module.exports = processTransformedInput;