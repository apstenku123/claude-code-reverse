/**
 * Applies the Sd9 transformation function to each input argument and concatenates the results into a single string.
 *
 * @param {...any} values - The values to be transformed and joined.
 * @returns {string} The concatenated string after applying Sd9 to each input value.
 */
function mapAndJoinSd9(...values) {
  // Transform each value using Sd9 and join the results into a single string
  return values.map(value => Sd9(value)).join("");
}

module.exports = mapAndJoinSd9;