/**
 * Converts a string to title case.
 * Each word in the string will have its first letter capitalized and the rest in lowercase.
 * Leading and trailing whitespace is removed before conversion.
 *
 * @param {string} inputString - The string to convert to title case.
 * @returns {string} The title-cased version of the input string.
 */
function toTitleCase(inputString) {
  return inputString
    .trim() // Remove leading and trailing whitespace
    .toLowerCase() // Convert the entire string to lowercase
    .replace(
      /([a-z\d])(\w*)/g, // Match the first letter and the rest of each word
      (match, firstLetter, remainingLetters) => {
        // Capitalize the first letter and append the rest of the word
        return firstLetter.toUpperCase() + remainingLetters;
      }
    );
}

module.exports = toTitleCase;