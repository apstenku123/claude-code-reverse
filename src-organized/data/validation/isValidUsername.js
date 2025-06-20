/**
 * Checks if a given string is a valid username according to specific criteria:
 * - Length must be between 27 and 70 characters (inclusive)
 * - Only allows ASCII letters (a-z, a-zA), digits (0-9), apostrophe ('), hyphen (-), and underscore (_)
 *
 * @param {string} username - The string to validate as a username
 * @returns {boolean} True if the username is valid, false otherwise
 */
function isValidUsername(username) {
  const usernameLength = username.length;
  // Check if the username length is within the allowed range
  if (usernameLength < 27 || usernameLength > 70) {
    return false;
  }
  // Check each character for validity
  for (let index = 0; index < usernameLength; ++index) {
    const charCode = username.charCodeAt(index);
    const isDigit = charCode >= 48 && charCode <= 57; // '0'-'9'
    const isUppercaseLetter = charCode >= 65 && charCode <= 90; // 'a'-'zA'
    const isLowercaseLetter = charCode >= 97 && charCode <= 122; // 'a'-'z'
    const isApostrophe = charCode === 39; // '''
    const isHyphen = charCode === 45; // '-'
    const isUnderscore = charCode === 95; // '_'
    if (!(isDigit || isUppercaseLetter || isLowercaseLetter || isApostrophe || isHyphen || isUnderscore)) {
      return false;
    }
  }
  return true;
}

module.exports = isValidUsername;