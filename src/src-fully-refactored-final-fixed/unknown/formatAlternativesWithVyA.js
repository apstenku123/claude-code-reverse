/**
 * Formats a list of values as an alternation group using getSourceString transformation.
 * Each value is first transformed by the getSourceString function, then joined with a pipe (|),
 * and finally wrapped in parentheses. This is commonly used for generating
 * regular expression alternation groups or similar pattern constructs.
 *
 * @param {...any} values - The values to be transformed and formatted as alternatives.
 * @returns {string} The formatted alternation group string.
 */
function formatAlternativesWithVyA(...values) {
  // Transform each value using getSourceString and join with '|', then wrap in parentheses
  return '(' + values.map(value => getSourceString(value)).join('|') + ')';
}

module.exports = formatAlternativesWithVyA;