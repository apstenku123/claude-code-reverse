/**
 * Processes each input value using the getPatternSource function and concatenates the results into a single string.
 *
 * @param {...any} values - The values to be processed and concatenated.
 * @returns {string} The concatenated string after processing each input value with getPatternSource.
 */
function processAndConcatenateStrings(...values) {
  // Apply getPatternSource to each value and join the results into a single string
  return values.map(value => getPatternSource(value)).join("");
}

module.exports = processAndConcatenateStrings;