/**
 * Attempts to parse the input string as an integer. If successful and the parsed integer
 * is strictly equal to the original string (as a number), returns the integer value.
 * Otherwise, returns the Unicode code point of the first character of the string.
 *
 * @param {string} inputString - The string to parse as an integer or to get the char code from.
 * @returns {number} The parsed integer if the string is a valid integer, otherwise the char code of the first character.
 */
function parseStringToIntOrCharCode(inputString) {
  // Parse the input string as an integer in base 10
  const parsedInteger = parseInt(inputString, 10);

  // Check if the parsed integer is strictly equal to the original string (as a number)
  if (parsedInteger == inputString) {
    return parsedInteger;
  }

  // If not, return the Unicode code point of the first character
  return inputString.charCodeAt(0);
}

module.exports = parseStringToIntOrCharCode;