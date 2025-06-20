/**
 * Creates a regular expression group from the provided patterns.
 * Each pattern is processed by the getSourceStringOrPattern function, and the results are joined with a pipe (|),
 * then wrapped in parentheses to form a regex group.
 *
 * @param {...string} patterns - The pattern strings to be processed and grouped.
 * @returns {string} The resulting regular expression group as a string.
 */
function createRegexGroupFromPatterns(...patterns) {
  // Process each pattern using getSourceStringOrPattern and join them with '|', then wrap in parentheses
  const processedPatterns = patterns.map(pattern => getSourceStringOrPattern(pattern));
  return `(${processedPatterns.join('|')})`;
}

module.exports = createRegexGroupFromPatterns;