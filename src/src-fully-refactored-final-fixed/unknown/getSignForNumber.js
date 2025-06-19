/**
 * Determines the sign of a given number.
 *
 * Returns -1 if the number is negative, otherwise returns 1.
 *
 * @param {number} number - The number to evaluate.
 * @returns {number} - Returns -1 if the number is negative, otherwise 1.
 */
function getSignForNumber(number) {
  // If the number is less than zero, return -1; otherwise, return 1
  return number < 0 ? -1 : 1;
}

module.exports = getSignForNumber;