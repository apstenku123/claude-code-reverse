/**
 * Applies the getSourceString transformation function to each input argument and concatenates the results into a single string.
 *
 * @param {...string} inputStrings - The strings to be transformed and concatenated.
 * @returns {string} The concatenated result of applying getSourceString to each input string.
 */
function mapAndJoinWithQkA(...inputStrings) {
  // Transform each input string using getSourceString and join the results into a single string
  return inputStrings.map((inputString) => getSourceString(inputString)).join("");
}

module.exports = mapAndJoinWithQkA;