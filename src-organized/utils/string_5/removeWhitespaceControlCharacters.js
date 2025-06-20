/**
 * Removes tab, line feed, and carriage return characters from the input string.
 *
 * @param {string} inputString - The string from which to remove whitespace control characters.
 * @returns {string} The input string with tab (\u0009), line feed (\u000A), and carriage return (\u000D) characters removed.
 */
function removeWhitespaceControlCharacters(inputString) {
  // Replace tab, line feed, and carriage return characters with an empty string
  return inputString.replace(/[\u0009\u000A\u000D]/g, "");
}

module.exports = removeWhitespaceControlCharacters;