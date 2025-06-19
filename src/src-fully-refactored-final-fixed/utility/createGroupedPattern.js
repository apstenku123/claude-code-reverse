/**
 * Creates a grouped pattern string by applying the getSourceString transformation to each input pattern.
 *
 * @param {...string} patterns - The pattern strings to be transformed and grouped.
 * @returns {string} a string representing the grouped patterns, each transformed by getSourceString and separated by '|', wrapped in parentheses.
 */
function createGroupedPattern(...patterns) {
  // Transform each pattern using getSourceString and join them with '|', then wrap in parentheses
  const transformedPatterns = patterns.map(pattern => getSourceString(pattern));
  return `(${transformedPatterns.join('|')})`;
}

module.exports = createGroupedPattern;