/**
 * Calculates a metric for a given array using the provided metric function.
 * If the input array is null, undefined, or empty, returns 0.
 *
 * @param {Array} inputArray - The array to process.
 * @returns {number} The result of the metric function or 0 if the array is empty or invalid.
 */
function getArrayMetric(inputArray) {
  // Check if inputArray is valid and has elements
  if (inputArray && inputArray.length) {
    // sumMappedValues is an external function that applies a metric (e.g., sum, max) to the array
    return sumMappedValues(inputArray, transformAndProcessInput);
  }
  // Return 0 if inputArray is null, undefined, or empty
  return 0;
}

module.exports = getArrayMetric;