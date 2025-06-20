/**
 * Removes all tab, line feed, and carriage return characters from the input string.
 *
 * @param {string} inputString - The string to process and remove whitespace characters from.
 * @returns {string} The input string with all tab (\u0009), line feed (\u000A), and carriage return (\u000D) characters removed.
 */
function removeWhitespaceCharacters(inputString) {
  // Use a regular expression to match tab, line feed, and carriage return characters globally
  return inputString.replace(/[\u0009\u000A\u000D]/g, "");
}

module.exports = removeWhitespaceCharacters;