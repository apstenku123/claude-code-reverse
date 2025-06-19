/**
 * Converts an ASCII character code to its corresponding base-36 numeric value.
 *
 * - For ASCII codes representing digits ('0'-'9', codes 48-57), returns 0-9.
 * - For ASCII codes representing uppercase or lowercase letters ('a'-'zA', 'a'-'z'), returns 10-35.
 *
 * @param {number} asciiCode - The ASCII code of a single character (e.g., 65 for 'a').
 * @returns {number} The numeric value corresponding to the base-36 representation of the character.
 */
function asciiCodeToBase36Value(asciiCode) {
  // Check if the ASCII code is for a digit ('0'-'9')
  if (asciiCode >= 48 && asciiCode <= 57) {
    return asciiCode - 48; // '0' is 48 in ASCII
  }
  // For letters ('a'-'zA', 'a'-'z'), normalize case and map to 10-35
  // (a & 223) converts lowercase to uppercase (e.g., 'a' (97) & 223 = 'a' (65))
  return (asciiCode & 223) - 55; // 'a' (65) - 55 = 10
}

module.exports = asciiCodeToBase36Value;