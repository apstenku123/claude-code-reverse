/**
 * Compares two values and returns an integer indicating their relative order.
 *
 * @param {any} firstValue - The first value to compare.
 * @param {any} secondValue - The second value to compare.
 * @returns {number} Returns -1 if firstValue < secondValue, 1 if firstValue > secondValue, or 0 if they are equal.
 */
function compareValues(firstValue, secondValue) {
  // If firstValue is less than secondValue, return -1
  if (firstValue < secondValue) {
    return -1;
  }
  // If firstValue is greater than secondValue, return 1
  if (firstValue > secondValue) {
    return 1;
  }
  // If both values are equal, return 0
  return 0;
}

module.exports = compareValues;