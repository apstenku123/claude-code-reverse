/**
 * Creates a regular expression alternation group from the provided patterns.
 * Each pattern is processed by the external getSourceString function, then joined with a pipe (|),
 * and wrapped in parentheses to form a regex group.
 *
 * @param {...string} patterns - The list of string patterns to group as alternations.
 * @returns {string} a string representing the alternation group, e.g., '(foo|bar|baz)'.
 */
function createAlternationGroup(...patterns) {
  // Map each pattern through the getSourceString function, then join with '|', and wrap in parentheses
  return '(' + patterns.map(pattern => getSourceString(pattern)).join('|') + ')';
}

module.exports = createAlternationGroup;