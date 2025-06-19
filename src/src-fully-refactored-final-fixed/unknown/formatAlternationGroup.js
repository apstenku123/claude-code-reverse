/**
 * Formats a group of values into a string representing an alternation group, commonly used in regular expressions.
 * Each value is first transformed by the getSourceString function, then joined with a pipe (|) and wrapped in parentheses.
 *
 * @param {...any} values - The values to be formatted into an alternation group.
 * @returns {string} a string representing the alternation group, e.g., (foo|bar|baz).
 */
function formatAlternationGroup(...values) {
  // Transform each value using the getSourceString function
  const transformedValues = values.map(value => getSourceString(value));
  // Join the transformed values with a pipe and wrap in parentheses
  return `(${transformedValues.join('|')})`;
}

module.exports = formatAlternationGroup;