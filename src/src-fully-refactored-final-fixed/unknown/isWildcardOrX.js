/**
 * Checks if the given character is a wildcard ('*') or the letter 'x'/'X'.
 *
 * @param {string} character - The character to check.
 * @returns {boolean} True if the character is '*', 'x', or 'X'; otherwise, false.
 */
function isWildcardOrX(character) {
  // Return true if character is a wildcard or 'x'/'X' (case-sensitive)
  return character === '*' || character === 'x' || character === 'X';
}

module.exports = isWildcardOrX;