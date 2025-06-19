/**
 * Checks if the given character code corresponds to a carriage return (CR) or line feed (LF).
 *
 * @param {number} charCode - The character code to check.
 * @returns {boolean} True if the character code is 10 (LF) or 13 (CR), otherwise false.
 */
function isCarriageReturnOrLineFeed(charCode) {
  // Character code 10 is Line Feed (LF), 13 is Carriage Return (CR)
  return charCode === 10 || charCode === 13;
}

module.exports = isCarriageReturnOrLineFeed;