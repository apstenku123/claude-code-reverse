/**
 * Compares two strings for equality, allowing specific character substitutions.
 *
 * This function checks if two strings are equal in length and content, but allows for the following special cases:
 *   - a '+' in the first string is considered equal to a '-' in the second string
 *   - a '/' in the first string is considered equal to a '_' in the second string
 *
 * @param {string} firstString - The first string to compare
 * @param {string} secondString - The second string to compare
 * @returns {boolean} True if the strings are equivalent considering the special cases, false otherwise
 */
function areStringsEquivalentWithSpecialCases(firstString, secondString) {
  // If the strings are not the same length, they cannot be equivalent
  if (firstString.length !== secondString.length) {
    return false;
  }

  // Compare each character, allowing for special substitutions
  for (let index = 0; index < firstString.length; ++index) {
    if (firstString[index] !== secondString[index]) {
      // Allow '+' in firstString to match '-' in secondString
      // Allow '/' in firstString to match '_' in secondString
      const isPlusToMinus = firstString[index] === '+' && secondString[index] === '-';
      const isSlashToUnderscore = firstString[index] === '/' && secondString[index] === '_';
      if (isPlusToMinus || isSlashToUnderscore) {
        continue;
      }
      // If characters do not match and are not a special case, strings are not equivalent
      return false;
    }
  }
  // All characters matched (with allowed substitutions)
  return true;
}

module.exports = areStringsEquivalentWithSpecialCases;