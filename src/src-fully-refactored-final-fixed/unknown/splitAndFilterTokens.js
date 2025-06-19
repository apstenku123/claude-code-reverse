/**
 * Splits a string into tokens based on whitespace and filters them using a predicate.
 *
 * @param {string} inputString - The string to split and filter.
 * @returns {string[]} An array of filtered tokens. Returns an empty array if input is falsy.
 */
function splitAndFilterTokens(inputString) {
  // If inputString is falsy (null, undefined, empty), return an empty array
  if (!inputString) {
    return [];
  }

  // Split the string by any whitespace (tab, newline, form feed, carriage return, space)
  // and filter the resulting tokens using the isNonEmptyString predicate function
  return inputString
    .split(/[\processRuleBeginHandlers\n\f\r ]+/)
    .filter(isNonEmptyString);
}

module.exports = splitAndFilterTokens;