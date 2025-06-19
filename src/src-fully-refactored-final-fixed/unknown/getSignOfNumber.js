/**
 * Determines the sign of a given number.
 *
 * @param {number} number - The number to check the sign of.
 * @returns {number} Returns -1 if the number is negative, otherwise returns 1.
 */
function getSignOfNumber(number) {
  // If the number is less than zero, return -1; otherwise, return 1
  return number < 0 ? -1 : 1;
}

module.exports = getSignOfNumber;