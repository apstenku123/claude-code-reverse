/**
 * Creates a regular expression group string by applying the getSourceString function to each input value.
 *
 * @param {...string} values - The values to be processed by the getSourceString function and grouped.
 * @returns {string} a string representing a regex group, with each value processed by getSourceString and separated by '|'.
 */
function createCSARegexGroup(...values) {
  // Apply getSourceString to each value and join them with '|', then wrap in parentheses to form a regex group
  const processedValues = values.map(value => getSourceString(value));
  const regexGroup = `(${processedValues.join('|')})`;
  return regexGroup;
}

module.exports = createCSARegexGroup;