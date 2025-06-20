/**
 * Creates a regular expression group string by mapping each input value through the getSourceString function
 * and joining the results with a pipe (|) character. The final string is wrapped in parentheses.
 *
 * @param {...string} values - The values to be mapped and grouped in the regex string.
 * @returns {string} The resulting regular expression group string.
 */
function createRegexGroupFromMappedValues(...values) {
  // Map each value using the getSourceString function and join them with '|', then wrap in parentheses
  const mappedValues = values.map(value => getSourceString(value));
  const regexGroup = `(${mappedValues.join('|')})`;
  return regexGroup;
}

module.exports = createRegexGroupFromMappedValues;