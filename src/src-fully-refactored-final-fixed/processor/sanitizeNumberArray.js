/**
 * Ensures that the first 'length' elements of the provided array are numbers.
 * If any of these elements are not numbers, they are set to 0.
 *
 * @param {Array} numberArray - The array to sanitize.
 * @param {number} length - The number of elements to check and sanitize.
 * @returns {Array} The sanitized array with non-number elements replaced by 0 up to the specified length.
 */
function sanitizeNumberArray(numberArray, length) {
  for (let index = 0; index < length; index++) {
    // If the current element is not a number, set isBlobOrFileLikeObject to 0
    if (typeof numberArray[index] !== "number") {
      numberArray[index] = 0;
    }
  }
  return numberArray;
}

module.exports = sanitizeNumberArray;