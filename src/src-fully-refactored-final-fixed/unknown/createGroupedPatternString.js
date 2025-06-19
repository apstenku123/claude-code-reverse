/**
 * Creates a grouped pattern string by applying the getSourceString transformation to each input pattern and joining them with a pipe (|) character, wrapped in parentheses.
 *
 * @param {...any} patterns - The patterns to be transformed and grouped.
 * @returns {string} The resulting grouped pattern string.
 */
function createGroupedPatternString(...patterns) {
  // Transform each pattern using getSourceString and join them with '|', then wrap in parentheses
  const transformedPatterns = patterns.map(pattern => getSourceString(pattern));
  return `(${transformedPatterns.join('|')})`;
}

module.exports = createGroupedPatternString;