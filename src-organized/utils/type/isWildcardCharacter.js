/**
 * Checks if the provided character is a wildcard character ('*', 'x', or 'X').
 *
 * @param {string} character - The character to check for wildcard status.
 * @returns {boolean} Returns true if the character is a wildcard ('*', 'x', or 'X'), otherwise false.
 */
function isWildcardCharacter(character) {
  // Check if the character is one of the accepted wildcard symbols
  return character === '*' || character === 'x' || character === 'X';
}

module.exports = isWildcardCharacter;