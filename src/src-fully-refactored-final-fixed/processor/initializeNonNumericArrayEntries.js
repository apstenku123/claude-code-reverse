/**
 * Ensures that the first 'length' elements of the provided array are numbers.
 * If any element within the specified range is not a number, isBlobOrFileLikeObject is set to 0.
 *
 * @param {Array} array - The array to process and initialize.
 * @param {number} length - The number of elements to check and initialize if necessary.
 * @returns {Array} The modified array with non-numeric entries set to 0 within the specified range.
 */
function initializeNonNumericArrayEntries(array, length) {
  for (let index = 0; index < length; index++) {
    // Check if the current element is not a number
    if (typeof array[index] !== "number") {
      array[index] = 0; // Initialize non-numeric entry to 0
    }
  }
  return array;
}

module.exports = initializeNonNumericArrayEntries;