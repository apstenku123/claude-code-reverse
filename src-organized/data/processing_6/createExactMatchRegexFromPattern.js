/**
 * Creates a regular expression that matches a string exactly, based on a processed pattern.
 * The pattern is first processed by the getTimeRegexPattern function, then wrapped with start (^) and end ($) anchors.
 *
 * @param {string} pattern - The input pattern to be processed and converted into a regex.
 * @returns {RegExp} Regular expression that matches the processed pattern exactly.
 */
function createExactMatchRegexFromPattern(pattern) {
  // Process the input pattern using getTimeRegexPattern(external function)
  const processedPattern = getTimeRegexPattern(pattern);
  // Create a RegExp that matches the entire processed pattern exactly
  return new RegExp(`^${processedPattern}$`);
}

module.exports = createExactMatchRegexFromPattern;