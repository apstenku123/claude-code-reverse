/**
 * Determines if the provided character is a whitespace character (space, tab, newline, or carriage return).
 *
 * @param {string} character - The character to check.
 * @returns {boolean} True if the character is a whitespace character; otherwise, false.
 */
function isWhitespaceCharacter(character) {
  // Check for space, tab, newline, or carriage return
  return (
    character === ' ' ||
    character === '\processRuleBeginHandlers' ||
    character === '\n' ||
    character === '\r'
  );
}

module.exports = isWhitespaceCharacter;