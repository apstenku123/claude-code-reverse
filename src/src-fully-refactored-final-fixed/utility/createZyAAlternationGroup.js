/**
 * Creates a string representing a group of getSourceString-transformed values separated by alternation (|) and enclosed in parentheses.
 *
 * Each argument is passed through the getSourceString function, and the results are joined with a pipe (|) character,
 * then wrapped in parentheses. This is commonly used to build regular expression alternation groups.
 *
 * @param {...string} values - The values to be transformed by getSourceString and grouped.
 * @returns {string} a string in the form of (getSourceString(value1)|getSourceString(value2)|...)
 */
function createZyAAlternationGroup(...values) {
  // Transform each value using getSourceString and join them with '|', then wrap in parentheses
  const transformedValues = values.map(value => getSourceString(value));
  const alternationGroup = '(' + transformedValues.join('|') + ')';
  return alternationGroup;
}

module.exports = createZyAAlternationGroup;