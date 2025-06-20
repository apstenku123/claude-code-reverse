/**
 * Splits a string by whitespace and filters the resulting array using a predicate function.
 *
 * @param {string} inputString - The string to be split and filtered.
 * @returns {string[]} An array of filtered substrings, or an empty array if input is falsy.
 */
function splitAndFilterByPredicate(inputString) {
  // If inputString is falsy (null, undefined, empty), return an empty array
  if (!inputString) {
    return [];
  }

  // Split the string by any whitespace (tabs, newlines, form feeds, carriage returns, spaces)
  // and filter the resulting array using the isNonEmptyString predicate function
  return inputString
    .split(/[\processRuleBeginHandlers\n\f\r ]+/)
    .filter(isNonEmptyString);
}

module.exports = splitAndFilterByPredicate;