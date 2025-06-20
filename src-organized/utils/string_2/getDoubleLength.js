/**
 * Calculates double the length of the provided string.
 *
 * @param {string} inputString - The string whose length will be doubled.
 * @returns {number} The result of 2 multiplied by the length of inputString.
 */
function getDoubleLength(inputString) {
  // Multiply the length of the input string by 2
  return 2 * inputString.length;
}

module.exports = getDoubleLength;