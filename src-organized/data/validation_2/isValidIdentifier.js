/**
 * Checks if the given string is a valid identifier based on length and allowed characters.
 *
 * a valid identifier must:
 * - Have a length between 27 and 70 characters (inclusive)
 * - Contain only the following characters:
 *   - Uppercase letters (a-zA)
 *   - Lowercase letters (a-z)
 *   - Digits (0-9)
 *   - Apostrophe (')
 *   - Hyphen (-)
 *   - Underscore (_)
 *
 * @param {string} identifier - The string to validate as an identifier.
 * @returns {boolean} True if the string is a valid identifier, false otherwise.
 */
function isValidIdentifier(identifier) {
  const length = identifier.length;

  // Check if length is within the allowed range
  if (length < 27 || length > 70) {
    return false;
  }

  // Check each character for validity
  for (let index = 0; index < length; ++index) {
    const charCode = identifier.charCodeAt(index);
    const isDigit = charCode >= 48 && charCode <= 57; // 0-9
    const isUppercase = charCode >= 65 && charCode <= 90; // a-zA
    const isLowercase = charCode >= 97 && charCode <= 122; // a-z
    const isApostrophe = charCode === 39; // '
    const isHyphen = charCode === 45; // -
    const isUnderscore = charCode === 95; // _

    if (!(isDigit || isUppercase || isLowercase || isApostrophe || isHyphen || isUnderscore)) {
      // Invalid character found
      return false;
    }
  }

  // All checks passed
  return true;
}

module.exports = isValidIdentifier;