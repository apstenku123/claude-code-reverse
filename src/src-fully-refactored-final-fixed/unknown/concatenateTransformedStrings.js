/**
 * Transforms each input value using the getSourceString function and concatenates the results into a single string.
 *
 * @param {...any} values - The values to be transformed and concatenated.
 * @returns {string} The concatenated string after transformation.
 */
function concatenateTransformedStrings(...values) {
  // Transform each value using the external getSourceString function
  const transformedStrings = values.map(value => getSourceString(value));
  // Join all transformed strings into a single string
  return transformedStrings.join("");
}

module.exports = concatenateTransformedStrings;