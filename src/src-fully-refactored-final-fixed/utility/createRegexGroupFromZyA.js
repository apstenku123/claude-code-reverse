/**
 * Creates a regular expression group string by applying the getSourceString transformation to each input value.
 *
 * @param {...any} values - The values to be transformed and grouped.
 * @returns {string} a string representing the group of transformed values, separated by '|', and wrapped in parentheses.
 */
function createRegexGroupFromZyA(...values) {
  // Transform each value using getSourceString and join them with '|', then wrap in parentheses
  const transformedValues = values.map(value => getSourceString(value));
  return `(${transformedValues.join('|')})`;
}

module.exports = createRegexGroupFromZyA;