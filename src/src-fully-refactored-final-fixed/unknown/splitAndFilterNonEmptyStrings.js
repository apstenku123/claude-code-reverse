/**
 * Splits the input string using the specified delimiter and filters out any empty strings from the result.
 *
 * @param {string} inputString - The string to be split.
 * @param {string|RegExp} delimiter - The delimiter to use for splitting the string.
 * @returns {string[]} An array of non-empty substrings.
 */
function splitAndFilterNonEmptyStrings(inputString, delimiter) {
  // Split the input string by the delimiter and filter out empty strings
  return inputString.split(delimiter).filter(Boolean);
}

module.exports = splitAndFilterNonEmptyStrings;
