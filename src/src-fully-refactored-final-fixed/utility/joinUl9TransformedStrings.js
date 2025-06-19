/**
 * Transforms each input value using the getSourceString function and joins the results into a single string.
 *
 * @param {...any} values - The values to be transformed and joined.
 * @returns {string} The concatenated string of all transformed values.
 */
function joinUl9TransformedStrings(...values) {
  // Apply the getSourceString transformation to each value and join the results
  return values.map(value => getSourceString(value)).join("");
}

module.exports = joinUl9TransformedStrings;