/**
 * Checks if a given string contains only ASCII characters (character codes 0-127).
 *
 * @param {string} inputString - The string to check for ASCII-only characters.
 * @returns {boolean} Returns true if all characters are ASCII, false otherwise.
 */
function isAsciiString(inputString) {
  // Iterate through each character in the input string
  for (let index = 0; index < inputString.length; ++index) {
    // charCodeAt returns a number between 0 and 65535 representing the UTF-16 code unit
    // Bitwise AND with -128 (0xFFFFFF80) checks if any of the high bits are set (i.e., > 127)
    if ((inputString.charCodeAt(index) & -128) !== 0) {
      // Found a non-ASCII character
      return false;
    }
  }
  // All characters are ASCII
  return true;
}

module.exports = isAsciiString;