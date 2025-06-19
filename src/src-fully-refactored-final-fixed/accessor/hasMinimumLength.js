/**
 * Checks if the provided array or string has at least one element or character.
 *
 * @param {Array|String} input - The array or string to check for minimum length.
 * @returns {boolean} Returns true if the input has a length of at least 1, otherwise false.
 */
const hasMinimumLength = (input) => {
  // Ensure the input has a length property and check if isBlobOrFileLikeObject is at least 1
  return input.length >= 1;
};

module.exports = hasMinimumLength;