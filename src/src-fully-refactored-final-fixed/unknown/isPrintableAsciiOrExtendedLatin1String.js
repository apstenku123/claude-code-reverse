/**
 * Checks if a string contains only printable ASCII characters or extended Latin-1 characters.
 *
 * Printable ASCII: tab (code 9), codes 32-126 (space to tilde)
 * Extended Latin-1: codes 128-255
 *
 * @param {string} inputString - The string to validate.
 * @returns {boolean} True if all characters are printable ASCII or extended Latin-1, false otherwise.
 */
function isPrintableAsciiOrExtendedLatin1String(inputString) {
  for (let index = 0; index < inputString.length; ++index) {
    const charCode = inputString.charCodeAt(index);
    // Check if character is tab, printable ASCII, or extended Latin-1
    const isTab = charCode === 9;
    const isPrintableAscii = charCode >= 32 && charCode <= 126;
    const isExtendedLatin1 = charCode >= 128 && charCode <= 255;
    if (!(isTab || isPrintableAscii || isExtendedLatin1)) {
      return false; // Found a non-printable or non-allowed character
    }
  }
  return true; // All characters are allowed
}

module.exports = isPrintableAsciiOrExtendedLatin1String;