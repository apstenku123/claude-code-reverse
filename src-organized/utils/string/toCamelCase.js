/**
 * Converts a string with words separated by dashes, underscores, or spaces into camelCase format.
 *
 * Example: 'hello-world_test string' -> 'helloWorldTestString'
 *
 * @param {string} inputString - The string to convert to camelCase.
 * @returns {string} The camelCase formatted string.
 */
function toCamelCase(inputString) {
  // Convert the entire string to lowercase first
  return inputString
    .toLowerCase()
    // Replace any occurrence of dash, underscore, or space followed by a letter or digit
    // with the uppercase version of that letter/digit, effectively removing the separator
    .replace(/[-_\s]([a-z\d])(\w*)/g, function(match, firstChar, remainingChars) {
      // Capitalize the first character after the separator and append the rest
      return firstChar.toUpperCase() + remainingChars;
    });
}

module.exports = toCamelCase;
