/**
 * Checks if a string contains only printable ASCII or Latin-1 characters.
 *
 * Printable ASCII: tab (code 9), codes 32-126
 * Printable Latin-1: codes 128-255
 *
 * @param {string} inputString - The string to validate.
 * @returns {boolean} True if all characters are printable ASCII or Latin-1, false otherwise.
 */
function isPrintableAsciiOrLatin1String(inputString) {
  for (let index = 0; index < inputString.length; ++index) {
    const charCode = inputString.charCodeAt(index);
    // Check if character is tab, printable ASCII, or printable Latin-1
    const isTab = charCode === 9;
    const isPrintableAscii = charCode >= 32 && charCode <= 126;
    const isPrintableLatin1 = charCode >= 128 && charCode <= 255;
    if (!(isTab || isPrintableAscii || isPrintableLatin1)) {
      // Found a non-printable character
      return false;
    }
  }
  // All characters are printable
  return true;
}

module.exports = isPrintableAsciiOrLatin1String;