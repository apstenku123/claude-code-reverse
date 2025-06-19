/**
 * Maps two arrays together using a callback function and accumulates the results into an object.
 *
 * For each element in the sourceArray, calls the callback with:
 *   - the accumulator object
 *   - the current value from sourceArray
 *   - the corresponding value from targetArray (or undefined if out of bounds)
 *
 * @param {Array} sourceArray - The primary array to iterate over.
 * @param {Array} targetArray - The secondary array to map values from (may be shorter than sourceArray).
 * @param {Function} callback - Function to process each pair of values and update the accumulator object.
 * @returns {Object} The accumulated object after processing all elements.
 */
function mapArraysWithCallback(sourceArray, targetArray, callback) {
  const accumulator = {};
  const sourceLength = sourceArray.length;
  const targetLength = targetArray.length;

  // Iterate over every element in sourceArray
  for (let index = 0; index < sourceLength; index++) {
    // Use corresponding value from targetArray if available, otherwise undefined
    const targetValue = index < targetLength ? targetArray[index] : undefined;
    // Invoke the callback to process and accumulate
    callback(accumulator, sourceArray[index], targetValue);
  }

  return accumulator;
}

module.exports = mapArraysWithCallback;