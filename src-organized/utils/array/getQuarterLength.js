/**
 * Calculates the number of quarters in the given array-like object.
 *
 * This utility function takes an array or array-like object and returns
 * the result of dividing its length by 4. This can be used, for example,
 * to determine how many groups of four elements exist in the input.
 *
 * @param {Array|Object} inputArray - The array or array-like object whose length will be divided by 4.
 * @returns {number} The length of the input divided by 4.
 */
function getQuarterLength(inputArray) {
  // Divide the length of the input by 4 to get the number of quarters
  return inputArray.length / 4;
}

module.exports = getQuarterLength;