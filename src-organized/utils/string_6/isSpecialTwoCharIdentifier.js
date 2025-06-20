/**
 * Checks if the given string is a two-character identifier where:
 * - The first character is a valid special code point (as determined by isAsciiAlphabetic)
 * - The second character is either ':' or '|'
 *
 * @param {string} identifier - The string to check
 * @returns {boolean} True if the string matches the special identifier pattern, false otherwise
 */
function isSpecialTwoCharIdentifier(identifier) {
  // Ensure the identifier is exactly two characters long
  if (identifier.length !== 2) {
    return false;
  }

  // Check if the first character is a valid special code point using isAsciiAlphabetic
  const isFirstCharSpecial = isAsciiAlphabetic(identifier.codePointAt(0));

  // Check if the second character is either ':' or '|'
  const isSecondCharValid = identifier[1] === ':' || identifier[1] === '|';

  // Return true only if both conditions are met
  return isFirstCharSpecial && isSecondCharValid;
}

module.exports = isSpecialTwoCharIdentifier;