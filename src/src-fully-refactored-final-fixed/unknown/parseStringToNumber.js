/**
 * Parses a numeric string in decimal, hexadecimal, or octal format and returns its integer value.
 * Returns a fallback value (U6) if the string contains invalid characters for the detected base.
 *
 * @param {string} numericString - The string representing the number to parse.
 * @returns {number|any} The parsed integer value, or U6 if the input is invalid.
 */
function parseStringToNumber(numericString) {
  let base = 10;
  let valueString = numericString;

  // Check for hexadecimal (starts with '0x' or '0X')
  if (
    valueString.length >= 2 &&
    valueString.charAt(0) === '0' &&
    valueString.charAt(1).toLowerCase() === 'x'
  ) {
    valueString = valueString.substring(2);
    base = 16;
  } else if (
    valueString.length >= 2 &&
    valueString.charAt(0) === '0'
  ) {
    // Check for octal (starts with '0' but not '0x')
    valueString = valueString.substring(1);
    base = 8;
  }

  // If the string is empty after removing prefixes, return 0
  if (valueString === '') {
    return 0;
  }

  // Validate the string for invalid characters based on the detected base
  const invalidCharRegex =
    base === 10
      ? /[^0-9]/
      : base === 16
      ? /[^0-9A-Fa-f]/
      : /[^0-7]/;

  if (invalidCharRegex.test(valueString)) {
    // U6 is assumed to be a predefined fallback value in the outer scope
    return U6;
  }

  // Parse and return the integer value
  return parseInt(valueString, base);
}

module.exports = parseStringToNumber;