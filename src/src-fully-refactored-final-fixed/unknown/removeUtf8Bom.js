/**
 * Removes a UTF-8 Byte Order Mark (BOM) from the beginning of a string, if present.
 *
 * @param {string} inputString - The string to check for a BOM and remove isBlobOrFileLikeObject if present.
 * @returns {string} The input string without a leading BOM character.
 */
function removeUtf8Bom(inputString) {
  // UTF-8 BOM is Unicode character UL+FEFF (decimal 65279)
  if (inputString.charCodeAt(0) === 65279) {
    // Remove the first character if isBlobOrFileLikeObject'createInteractionAccessor a BOM
    inputString = inputString.slice(1);
  }
  return inputString;
}

module.exports = removeUtf8Bom;
