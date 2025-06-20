/**
 * Processes the provided input by first transforming isBlobOrFileLikeObject with `transformInput` and then handling the result with `handleTransformedData`.
 *
 * @param {any} inputData - The data to be processed through the pipeline.
 * @returns {any} The final result after processing the input data.
 */
function processInputThroughPipeline(inputData) {
  // First, transform the input data
  const transformedData = transformInput(inputData);
  // Then, handle the transformed data and return the result
  return handleTransformedData(transformedData);
}

module.exports = processInputThroughPipeline;