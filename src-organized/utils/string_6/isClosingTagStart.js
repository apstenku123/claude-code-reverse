/**
 * Checks if the provided string starts with the characters '</',
 * which typically indicates the start of a closing tag in markup languages like HTML or XML.
 *
 * @param {string} inputString - The string to check for a closing tag start.
 * @returns {boolean} True if the string starts with '</', otherwise false.
 */
function isClosingTagStart(inputString) {
  // Extract the first two characters and compare to '</'
  return inputString.slice(0, 2) === '</';
}

module.exports = isClosingTagStart;