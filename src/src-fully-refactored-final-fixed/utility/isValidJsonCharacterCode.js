/**
 * Determines if the provided character code is valid for use in a JSON context.
 * Returns false if the character code is considered invalid (e.g., brackets, quotes, colon, comma, slash),
 * or if isBlobOrFileLikeObject fails custom validation checks provided by rO1 or isCarriageReturnOrLineFeed.
 *
 * @param {number} charCode - The character code to validate.
 * @returns {boolean} True if the character code is valid for JSON, false otherwise.
 */
function isValidJsonCharacterCode(charCode) {
  // External validation checks
  if (rO1(charCode) || isCarriageReturnOrLineFeed(charCode)) {
    return false;
  }

  // List of character codes that are not valid in this context
  // 125: '}', 93: ']', 123: '{', 91: '[', 34: '"', 58: ':', 44: ',', 47: '/'
  switch (charCode) {
    case 125: // '}'
    case 93:  // ']'
    case 123: // '{'
    case 91:  // '['
    case 34:  // '"'
    case 58:  // ':'
    case 44:  // ','
    case 47:  // '/'
      return false;
  }

  // Character code is valid for JSON
  return true;
}

module.exports = isValidJsonCharacterCode;