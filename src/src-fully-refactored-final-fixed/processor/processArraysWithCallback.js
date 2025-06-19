/**
 * Iterates over the sourceArray, and for each element, calls the callback with the accumulator object,
 * the current element from sourceArray, and the corresponding element from compareArray (or undefined if out of bounds).
 * Returns the accumulator object after processing all elements.
 *
 * @param {Array} sourceArray - The primary array to iterate over.
 * @param {Array} compareArray - The secondary array to provide corresponding values (may be shorter than sourceArray).
 * @param {Function} callback - Function to invoke for each element. Receives (accumulator, sourceValue, compareValue).
 * @returns {Object} The accumulator object after processing all elements.
 */
function processArraysWithCallback(sourceArray, compareArray, callback) {
  let index = 0;
  const sourceLength = sourceArray.length;
  const compareLength = compareArray.length;
  const accumulator = {};

  // Iterate over each element in sourceArray
  while (index < sourceLength) {
    // Use the corresponding value from compareArray if available, otherwise undefined
    const compareValue = index < compareLength ? compareArray[index] : undefined;
    // Invoke the callback with the accumulator, current source value, and compare value
    callback(accumulator, sourceArray[index], compareValue);
    index++;
  }

  return accumulator;
}

module.exports = processArraysWithCallback;