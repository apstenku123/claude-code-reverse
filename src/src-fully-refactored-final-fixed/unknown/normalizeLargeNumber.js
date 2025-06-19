/**
 * Normalizes large numbers by dividing them by 1000 if they exceed 9,999,999,999.
 *
 * @param {number} value - The numeric value to be normalized.
 * @returns {number} The normalized value: divided by 1000 if greater than 9,999,999,999, otherwise the original value.
 */
function normalizeLargeNumber(value) {
  // If the value is greater than 9,999,999,999, divide by 1000 to normalize
  if (value > 9999999999) {
    return value / 1000;
  }
  // Otherwise, return the original value
  return value;
}

module.exports = normalizeLargeNumber;