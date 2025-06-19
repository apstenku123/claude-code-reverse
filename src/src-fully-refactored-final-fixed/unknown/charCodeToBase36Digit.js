/**
 * Converts an ASCII character code to its corresponding base-36 digit value.
 * Supports numeric digits ('0'-'9') and uppercase/lowercase letters ('a'-'zA', 'a'-'z').
 *
 * @param {number} charCode - The ASCII code of the character to convert.
 * @returns {number} The base-36 digit value (0-35) corresponding to the character code.
 *                  Returns 0-9 for '0'-'9', 10-35 for 'a'-'zA'/'a'-'z'.
 */
function charCodeToBase36Digit(charCode) {
  // Check if the character code is for a numeric digit ('0'-'9')
  if (charCode >= 48 && charCode <= 57) {
    return charCode - 48; // '0' is 48 in ASCII
  }
  // For letters, convert to uppercase (by clearing bit 5 with & 223), then map 'a'-'zA' to 10-35
  return (charCode & 223) - 55; // 'a' (65) & 223 = 65, 65 - 55 = 10
}

module.exports = charCodeToBase36Digit;