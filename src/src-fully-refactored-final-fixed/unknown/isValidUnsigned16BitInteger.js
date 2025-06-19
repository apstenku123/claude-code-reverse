/**
 * Checks if the provided value is a valid unsigned 16-bit integer (0 to 65535).
 *
 * This function parses the input as an integer in base 10, then verifies:
 *   - The parsed integer is strictly equal to the numeric value of the input (no decimals or extra characters)
 *   - The value is within the range 0 to 65535 (inclusive)
 *
 * @param {string|number} value - The value to validate as an unsigned 16-bit integer.
 * @returns {boolean} True if the value is a valid unsigned 16-bit integer, false otherwise.
 */
function isValidUnsigned16BitInteger(value) {
  // Parse the input as an integer in base 10
  const parsedInteger = parseInt(value, 10);

  // Check that:
  // 1. The parsed integer is strictly equal to the numeric value of the input (ensures no decimals or extra characters)
  // 2. The integer is within the valid range for unsigned 16-bit integers
  return (
    parsedInteger === Number(value) &&
    parsedInteger >= 0 &&
    parsedInteger <= 65535
  );
}

module.exports = isValidUnsigned16BitInteger;