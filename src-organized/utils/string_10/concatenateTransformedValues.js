/**
 * Transforms each input value using the getSourceString function and concatenates the results into a single string.
 *
 * @param {...any} values - The values to be transformed and concatenated.
 * @returns {string} The concatenated string after transformation.
 */
function concatenateTransformedValues(...values) {
  // Apply the getSourceString transformation to each value and join the results into a single string
  return values.map(value => getSourceString(value)).join("");
}

module.exports = concatenateTransformedValues;