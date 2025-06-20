/**
 * Applies the getSourceString function to each input argument and concatenates the results into a single string.
 *
 * @param {...any} values - The values to be processed by the getSourceString function.
 * @returns {string} The concatenated string result after applying getSourceString to each input value.
 */
function mapAndJoinWithAOA(...values) {
  // Map each value through the getSourceString function and join the results into a single string
  return values.map(value => getSourceString(value)).join("");
}

module.exports = mapAndJoinWithAOA;