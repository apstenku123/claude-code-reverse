/**
 * Creates a regular expression group by applying the getRegexSourceOrString transformation to each input value.
 *
 * @param {...any} values - The values to be transformed by getRegexSourceOrString and grouped in a regex alternation.
 * @returns {string} a string representing a regex group with getRegexSourceOrString-transformed values separated by '|'.
 */
function createRegexGroupFromYc9(...values) {
  // Transform each value using getRegexSourceOrString and join them with '|', then wrap in parentheses
  const transformedValues = values.map(value => getRegexSourceOrString(value));
  return `(${transformedValues.join('|')})`;
}

module.exports = createRegexGroupFromYc9;