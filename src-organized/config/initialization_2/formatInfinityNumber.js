/**
 * Converts a number to a string, representing positive and negative infinity as '+Inf' and '-Inf' respectively.
 *
 * @param {number} value - The numeric value to format.
 * @returns {string} The formatted string representation of the number or infinity.
 */
function formatInfinityNumber(value) {
  // Check for positive infinity
  if (value === Number.POSITIVE_INFINITY) {
    return "+Inf";
  }
  // Check for negative infinity
  else if (value === Number.NEGATIVE_INFINITY) {
    return "-Inf";
  }
  // For all other numbers, return the string representation
  return `${value}`;
}

module.exports = formatInfinityNumber;