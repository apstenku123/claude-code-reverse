/**
 * Applies the getSourceString transformation to each input string and concatenates the results.
 *
 * @param {...string} inputStrings - One or more strings to be transformed and concatenated.
 * @returns {string} The concatenated result of transforming each input string with getSourceString.
 */
function transformAndConcatenateStrings(...inputStrings) {
  // Apply getSourceString transformation to each input string and join them into a single string
  return inputStrings.map((inputString) => getSourceString(inputString)).join("");
}

module.exports = transformAndConcatenateStrings;