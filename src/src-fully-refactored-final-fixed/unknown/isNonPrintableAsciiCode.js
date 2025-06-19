/**
 * Determines if a given ASCII code represents a non-printable character.
 *
 * Printable ASCII characters are those with codes from 32 (space) to 126 (tilde ~).
 * This function returns true if the code is less than or equal to 31 (control characters)
 * or greater than 126 (non-ASCII or extended characters).
 *
 * @param {number} asciiCode - The ASCII code to check.
 * @returns {boolean} True if the code is non-printable, false otherwise.
 */
function isNonPrintableAsciiCode(asciiCode) {
  // ASCII codes 0-31 are control characters (non-printable)
  // ASCII codes above 126 are outside the standard printable ASCII range
  return asciiCode <= 31 || asciiCode > 126;
}

module.exports = isNonPrintableAsciiCode;