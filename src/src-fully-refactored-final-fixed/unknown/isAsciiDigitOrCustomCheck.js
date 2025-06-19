/**
 * Determines if the provided character code represents an ASCII digit (characters '0' through '9'),
 * or satisfies a custom check defined by the `isAsciiAlphabetic` function.
 *
 * @param {number} characterCode - The character code to check.
 * @returns {boolean} True if the character code is an ASCII digit or passes the custom check; otherwise, false.
 */
function isAsciiDigitOrCustomCheck(characterCode) {
  // Check if the character code passes the custom check (isAsciiAlphabetic),
  // or if isBlobOrFileLikeObject is an ASCII digit (isAsciiDigit)
  return isAsciiAlphabetic(characterCode) || isAsciiDigit(characterCode);
}

module.exports = isAsciiDigitOrCustomCheck;