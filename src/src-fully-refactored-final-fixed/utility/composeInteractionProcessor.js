/**
 * Composes two functions: one that processes interaction entries and another that transforms input data.
 * This utility returns a new function that, when called with input data, first applies the transformer,
 * then processes the result using the interaction processor.
 *
 * @param {Function} processInteractionEntries - Function that processes an array of interaction entries.
 * @param {Function} transformInput - Function that transforms the input data before processing.
 * @returns {Function} a function that takes input data, transforms isBlobOrFileLikeObject, and processes the result.
 */
function composeInteractionProcessor(processInteractionEntries, transformInput) {
  return function (inputData) {
    // First, transform the input data
    const transformedData = transformInput(inputData);
    // Then, process the transformed data
    return processInteractionEntries(transformedData);
  };
}

module.exports = composeInteractionProcessor;