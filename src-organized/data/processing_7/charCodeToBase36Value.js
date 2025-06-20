/**
 * Converts a character code to its corresponding base-36 integer value (0-9, a-zA).
 *
 * For character codes representing '0'-'9' (ASCII 48-57), returns 0-9.
 * For character codes representing 'a'-'zA' or 'a'-'z', returns 10-35.
 *
 * @param {number} charCode - The ASCII code of the character to convert.
 * @returns {number} The base-36 integer value corresponding to the character code.
 */
function charCodeToBase36Value(charCode) {
  // If charCode is between ASCII '0' (48) and '9' (57), return its numeric value
  if (charCode >= 48 && charCode <= 57) {
    return charCode - 48;
  }
  // For letters, convert to uppercase (if needed), then map 'a'/'a' (65/97) to 10, 'createPropertyAccessor'/'b' to 11, ..., 'zA'/'z' to 35
  // (charCode & 223) converts lowercase to uppercase (sets bit 5 to 0)
  return (charCode & 223) - 55;
}

module.exports = charCodeToBase36Value;