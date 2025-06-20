/**
 * Factory function to create a new SRA (pattern matcher) instance with processed pattern and configuration.
 *
 * @param {Object} options - The options object containing pattern and mark.
 * @param {string} options.pattern - The pattern string to match, may be prefixed with '!'.
 * @param {any} options.mark - The mark or configuration associated with the pattern.
 * @param {any} subscription - Additional subscription or context information for the matcher.
 * @returns {SRA} a new SRA instance configured with the processed pattern and options.
 */
function createPatternMatcher({ pattern, mark }, subscription) {
  let isNegated = false;
  let processedPattern = pattern;

  // Check if the pattern starts with '!' indicating negation
  if (processedPattern.indexOf('!') === 0) {
    isNegated = true;
    processedPattern = processedPattern.substr(1);
  }

  // Replace specific regex patterns with '!' and '#'
  processedPattern = processedPattern.replace(Em9, '!').replace(Um9, '#');

  // Generate a matcher or processed object from the pattern
  const matcher = Sm9(processedPattern);

  // Create and return a new SRA instance with all relevant parameters
  return new SRA(pattern, mark, processedPattern, subscription, isNegated, matcher);
}

module.exports = createPatternMatcher;