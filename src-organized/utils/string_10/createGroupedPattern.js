/**
 * Constructs a grouped pattern string by applying a transformation function to each input pattern and joining them with a pipe (|), wrapped in parentheses.
 *
 * @param {...string} patterns - The pattern strings to be transformed and grouped.
 * @returns {string} The grouped pattern string, e.g., (pattern1|pattern2|pattern3).
 */
function createGroupedPattern(...patterns) {
  // Transform each pattern using getSourceStringOrPattern, then join them with '|', and wrap in parentheses
  return '(' + patterns.map(pattern => getSourceStringOrPattern(pattern)).join('|') + ')';
}

module.exports = createGroupedPattern;