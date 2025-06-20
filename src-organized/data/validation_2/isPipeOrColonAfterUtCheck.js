/**
 * Checks if the provided value passes the 'isAsciiAlphabetic' validation and if the given character code is either a colon (:) or a pipe (|).
 *
 * @param {any} valueToCheck - The value to validate using the 'isAsciiAlphabetic' function.
 * @param {number} charCode - The character code to check (should be 58 for ':' or 124 for '|').
 * @returns {boolean} True if 'isAsciiAlphabetic' returns true for the value and charCode is 58 or 124; otherwise, false.
 */
function isPipeOrColonAfterUtCheck(valueToCheck, charCode) {
  // Check if valueToCheck passes 'isAsciiAlphabetic' validation and charCode is ':' (58) or '|' (124)
  return isAsciiAlphabetic(valueToCheck) && (charCode === 58 || charCode === 124);
}

module.exports = isPipeOrColonAfterUtCheck;