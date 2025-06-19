/**
 * Checks if a string contains only printable ASCII characters (codes 32-126).
 *
 * @param {string} inputString - The string to validate.
 * @returns {boolean} True if all characters are printable ASCII, otherwise false.
 */
function isPrintableAsciiString(inputString) {
  for (let index = 0; index < inputString.length; ++index) {
    const charCode = inputString.charCodeAt(index);
    // ASCII printable characters are in the range 32 (space) to 126 (~)
    if (charCode < 32 || charCode > 126) {
      return false;
    }
  }
  return true;
}

module.exports = isPrintableAsciiString;