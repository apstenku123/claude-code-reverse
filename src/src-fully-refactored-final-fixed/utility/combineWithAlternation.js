/**
 * Combines multiple pattern strings into a single alternation group.
 *
 * Each input pattern is processed by the getSourceString function, and the results are joined with a pipe (|),
 * then wrapped in parentheses to form a regular expression alternation group.
 *
 * @param {...string} patterns - The pattern strings to be combined.
 * @returns {string} a string representing the alternation group of the processed patterns.
 */
function combineWithAlternation(...patterns) {
  // Process each pattern using getSourceString and join them with '|', then wrap in parentheses
  const processedPatterns = patterns.map(pattern => getSourceString(pattern));
  const alternationGroup = processedPatterns.join('|');
  return `(${alternationGroup})`;
}

module.exports = combineWithAlternation;