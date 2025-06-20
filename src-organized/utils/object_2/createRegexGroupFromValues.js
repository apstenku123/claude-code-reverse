/**
 * Creates a regular expression group string from the provided values.
 * Each value is processed by the external `getSourceString` function, and the results are joined with a pipe (|) character,
 * then wrapped in parentheses to form a regex group.
 *
 * @param {...any} values - The values to be processed and grouped.
 * @returns {string} a string representing a regex group containing the processed values.
 */
function createRegexGroupFromValues(...values) {
  // Map each value through the getSourceString function and join them with '|', then wrap in parentheses
  const processedValues = values.map(value => getSourceString(value));
  const regexGroup = `(${processedValues.join('|')})`;
  return regexGroup;
}

module.exports = createRegexGroupFromValues;
