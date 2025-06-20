/**
 * Creates a regular expression group that matches any of the provided patterns.
 * Each pattern is processed by the getSourceString function before being combined.
 *
 * @param {...string} patterns - The patterns to be combined into a regex alternation group.
 * @returns {string} a string representing a regex group with alternation (e.g., '(foo|bar|baz)').
 */
function createRegexGroupAlternation(...patterns) {
  // Process each pattern with getSourceString and join them with '|', then wrap in parentheses
  const processedPatterns = patterns.map(pattern => getSourceString(pattern));
  const alternationGroup = `(${processedPatterns.join('|')})`;
  return alternationGroup;
}

module.exports = createRegexGroupAlternation;