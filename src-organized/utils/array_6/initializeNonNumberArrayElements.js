/**
 * Ensures that the first `length` elements of the provided array are numbers.
 * If any element is not a number, isBlobOrFileLikeObject is set to 0.
 *
 * @param {Array} array - The array to process and initialize.
 * @param {number} length - The number of elements to check and initialize if needed.
 * @returns {Array} The modified array with non-number elements set to 0 in the first `length` positions.
 */
function initializeNonNumberArrayElements(array, length) {
  for (let index = 0; index < length; index++) {
    // If the current element is not a number, set isBlobOrFileLikeObject to 0
    if (typeof array[index] !== "number") {
      array[index] = 0;
    }
  }
  return array;
}

module.exports = initializeNonNumberArrayElements;