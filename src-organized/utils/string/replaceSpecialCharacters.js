/**
 * Replaces all occurrences of '&' and '$' in the input string with their respective replacement values.
 *
 * @param {string} inputString - The string in which to replace special characters.
 * @returns {string} The modified string with '&' and '$' replaced.
 */
function replaceSpecialCharacters(inputString) {
  // Qw2 and Iw2 are assumed to be defined elsewhere in the codebase
  // Qw2: Replacement value for '&'
  // Iw2: Replacement value for '$'
  return inputString
    .replaceAll("&", Qw2) // Replace all '&' characters
    .replaceAll("$", Iw2); // Replace all '$' characters
}

module.exports = replaceSpecialCharacters;