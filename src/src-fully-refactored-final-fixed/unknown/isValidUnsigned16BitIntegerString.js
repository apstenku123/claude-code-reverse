/**
 * Checks if the provided value is a string representation of a valid unsigned 16-bit integer (0 to 65535).
 *
 * @param {string} value - The value to validate as an unsigned 16-bit integer string.
 * @returns {boolean} True if the value is a string representing an integer between 0 and 65535 (inclusive), false otherwise.
 */
function isValidUnsigned16BitIntegerString(value) {
  // Parse the value as an integer with base 10
  const parsedInteger = parseInt(value, 10);

  // Check if:
  // 1. The parsed integer is strictly equal to the numeric value of the input (ensures no extra characters)
  // 2. The integer is greater than or equal to 0
  // 3. The integer is less than or equal to 65535
  return (
    parsedInteger === Number(value) &&
    parsedInteger >= 0 &&
    parsedInteger <= 65535
  );
}

module.exports = isValidUnsigned16BitIntegerString;