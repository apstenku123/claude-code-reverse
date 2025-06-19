/**
 * Splits a string by a specified delimiter and filters out any empty strings from the result.
 *
 * @param {string} inputString - The string to be split and filtered.
 * @param {string|RegExp} delimiter - The delimiter to split the string by.
 * @returns {string[]} An array of non-empty substrings.
 */
function splitAndFilterString(inputString, delimiter) {
  // Split the input string by the provided delimiter
  // Then filter out any empty strings from the resulting array
  return inputString.split(delimiter).filter(Boolean);
}

module.exports = splitAndFilterString;
