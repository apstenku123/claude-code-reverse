/**
 * Converts any underscore followed by a single character (e.g., _a) in the input string
 * to just the uppercase version of that character (e.g., a).
 *
 * For example: 'foo_bar_baz' becomes 'fooBarBaz'.
 *
 * @param {string} inputString - The string to process and convert.
 * @returns {string} - The processed string with underscores removed and following characters uppercased.
 */
function convertUnderscoreToUppercase(inputString) {
  // Use a regular expression to find all occurrences of an underscore followed by a non-underscore character
  // For each match, remove the underscore and convert the following character to uppercase
  return inputString.replace(/(_[^_])/g, (matchedSubstring) => {
    // matchedSubstring is always two characters: '_' and the character to uppercase
    // Remove the underscore (first character) and uppercase the remaining character
    return matchedSubstring.slice(1).toUpperCase();
  });
}

module.exports = convertUnderscoreToUppercase;