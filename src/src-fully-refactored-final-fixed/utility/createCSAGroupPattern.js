/**
 * Creates a grouped pattern string by applying the getSourceString function to each input value and joining them with a pipe (|) inside parentheses.
 *
 * @param {...string} values - The values to be processed by the getSourceString function and grouped.
 * @returns {string} a string pattern with each getSourceString-processed value separated by a pipe and wrapped in parentheses.
 */
function createCSAGroupPattern(...values) {
  // Apply the getSourceString function to each value and join with a pipe
  const csaPatterns = values.map(value => getSourceString(value));
  // Combine all patterns into a single group wrapped in parentheses
  const groupedPattern = `(${csaPatterns.join('|')})`;
  return groupedPattern;
}

module.exports = createCSAGroupPattern;