/**
 * Applies the getSourceString transformation to each input string and concatenates the results.
 *
 * @param {...string} inputStrings - The strings to be transformed and concatenated.
 * @returns {string} The concatenated string after applying getSourceString to each input.
 */
function concatenateTransformedStrings(...inputStrings) {
  // Transform each input string using getSourceString and join the results into a single string
  return inputStrings.map((inputString) => getSourceString(inputString)).join("");
}

module.exports = concatenateTransformedStrings;