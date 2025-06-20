/**
 * Checks if the provided character is a wildcard ('*') or the letter 'x'/'X'.
 *
 * @param {string} character - The character to check.
 * @returns {boolean} True if the character is '*', 'x', or 'X'; otherwise, false.
 */
function isWildcardOrXCharacter(character) {
  // Return true if the character is a wildcard or 'x'/'X'
  return character === '*' || character === 'x' || character === 'X';
}

module.exports = isWildcardOrXCharacter;