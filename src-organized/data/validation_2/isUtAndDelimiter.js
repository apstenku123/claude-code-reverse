/**
 * Checks if the given value passes the 'isAsciiAlphabetic' validation and if the delimiter code matches ':' or '|'.
 *
 * @param {any} valueToCheck - The value to validate using the 'isAsciiAlphabetic' function.
 * @param {number} delimiterCharCode - The character code to check against ':' (58) or '|' (124).
 * @returns {boolean} True if valueToCheck passes 'isAsciiAlphabetic' and delimiterCharCode is 58 or 124, otherwise false.
 */
function isUtAndDelimiter(valueToCheck, delimiterCharCode) {
  // Check if valueToCheck passes 'isAsciiAlphabetic' validation and delimiterCharCode is for ':' or '|'
  return isAsciiAlphabetic(valueToCheck) && (delimiterCharCode === 58 || delimiterCharCode === 124);
}

module.exports = isUtAndDelimiter;