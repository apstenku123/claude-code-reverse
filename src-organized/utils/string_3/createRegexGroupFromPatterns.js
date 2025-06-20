/**
 * Creates a regular expression group from the provided patterns.
 * Each pattern is processed by the getRegexSourceOrString function, and the results are joined with a pipe (|) to form a group.
 *
 * @param {...string} patterns - The patterns to be grouped in the regular expression.
 * @returns {string} a string representing the grouped regular expression.
 */
function createRegexGroupFromPatterns(...patterns) {
  // Process each pattern with getRegexSourceOrString and join them with '|', then wrap in parentheses
  const processedPatterns = patterns.map(pattern => getRegexSourceOrString(pattern));
  const regexGroup = '(' + processedPatterns.join('|') + ')';
  return regexGroup;
}

module.exports = createRegexGroupFromPatterns;