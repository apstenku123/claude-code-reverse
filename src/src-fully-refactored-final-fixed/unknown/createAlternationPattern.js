/**
 * Creates a regular expression alternation pattern from the provided values.
 * Each value is first transformed by the getSourceString function, then joined with a pipe (|) and wrapped in parentheses.
 *
 * @param {...any} values - The values to be transformed and combined into an alternation pattern.
 * @returns {string} a string representing the alternation pattern, e.g., "(foo|bar|baz)".
 */
function createAlternationPattern(...values) {
  // Transform each value using the getSourceString function, then join with '|', and wrap in parentheses
  const transformedValues = values.map(value => getSourceString(value));
  const alternationPattern = '(' + transformedValues.join('|') + ')';
  return alternationPattern;
}

module.exports = createAlternationPattern;