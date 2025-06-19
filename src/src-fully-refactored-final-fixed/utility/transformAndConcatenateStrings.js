/**
 * Applies the getSourceString transformation function to each input string and concatenates the results.
 *
 * @param {...string} inputStrings - The strings to be transformed and concatenated.
 * @returns {string} The concatenated result of all transformed strings.
 */
function transformAndConcatenateStrings(...inputStrings) {
  // Transform each input string using getSourceString and join the results into a single string
  return inputStrings.map((inputString) => getSourceString(inputString)).join("");
}

module.exports = transformAndConcatenateStrings;