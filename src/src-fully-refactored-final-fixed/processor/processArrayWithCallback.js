/**
 * Iterates over the sourceArray, applies a callback to each element and the corresponding element in compareArray,
 * and accumulates the results into an output object.
 *
 * @param {Array} sourceArray - The primary array to iterate over.
 * @param {Array} compareArray - The secondary array to provide corresponding values for each element in sourceArray.
 * @param {Function} callback - The function to execute for each pair of elements (from sourceArray and compareArray).
 *                              Receives (outputObject, sourceValue, compareValue) as arguments.
 * @returns {Object} The output object accumulated by the callback.
 */
function processArrayWithCallback(sourceArray, compareArray, callback) {
  let currentIndex = 0;
  const sourceLength = sourceArray.length;
  const compareLength = compareArray.length;
  const outputObject = {};

  // Iterate through all elements of the source array
  while (currentIndex < sourceLength) {
    // Use the corresponding value from compareArray if available, otherwise undefined
    const compareValue = currentIndex < compareLength ? compareArray[currentIndex] : undefined;
    // Apply the callback to accumulate results in outputObject
    callback(outputObject, sourceArray[currentIndex], compareValue);
    currentIndex++;
  }

  return outputObject;
}

module.exports = processArrayWithCallback;