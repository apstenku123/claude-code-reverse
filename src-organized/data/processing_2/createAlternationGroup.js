/**
 * Creates a grouped alternation (OR) pattern from the provided arguments.
 * Each argument is transformed using the getRegexSourceOrString utility, and the results are joined with a pipe (|),
 * then wrapped in parentheses. This is commonly used for building regular expression alternations.
 *
 * @param {...string} patterns - The patterns to be alternated, each will be processed by getRegexSourceOrString.
 * @returns {string} a string representing the grouped alternation of all processed patterns.
 */
function createAlternationGroup(...patterns) {
  // Map each pattern through the getRegexSourceOrString utility function
  const processedPatterns = patterns.map(pattern => getRegexSourceOrString(pattern));
  // Join all processed patterns with '|' to create an alternation group
  const alternationGroup = processedPatterns.join('|');
  // Wrap the alternation group in parentheses
  return `(${alternationGroup})`;
}

module.exports = createAlternationGroup;