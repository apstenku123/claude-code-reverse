/**
 * Removes a UTF-8 Byte Order Mark (BOM) from the beginning of a string if present.
 *
 * @param {string} inputString - The string to check and remove the BOM from.
 * @returns {string} The input string without a leading BOM character.
 */
function removeByteOrderMark(inputString) {
  // Unicode BOM character code is 65279
  if (inputString.charCodeAt(0) === 65279) {
    // Remove the first character (BOM)
    inputString = inputString.slice(1);
  }
  return inputString;
}

module.exports = removeByteOrderMark;
