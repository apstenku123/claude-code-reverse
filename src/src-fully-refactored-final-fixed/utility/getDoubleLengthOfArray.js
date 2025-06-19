/**
 * Calculates twice the length of the provided array-like object.
 *
 * @param {Array|Object} arrayLikeObject - The array-like object whose length will be doubled.
 * @returns {number} The result of 2 multiplied by the length of the input.
 */
function getDoubleLengthOfArray(arrayLikeObject) {
  // Multiply the length property by 2 and return the result
  return 2 * arrayLikeObject.length;
}

module.exports = getDoubleLengthOfArray;