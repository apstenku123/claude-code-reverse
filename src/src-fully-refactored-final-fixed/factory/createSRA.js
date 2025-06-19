/**
 * Factory function to create an SRA (Special Route Action) instance with processed pattern and configuration.
 *
 * @param {Object} options - The options object containing pattern and mark.
 * @param {string} options.pattern - The route pattern string, may start with '!' to indicate negation.
 * @param {any} options.mark - The mark or configuration associated with the route.
 * @param {any} subscription - The subscription or context object related to the SRA.
 * @returns {SRA} Returns a new SRA instance with the processed pattern and configuration.
 */
function createSRAInstance({ pattern: routePattern, mark: routeMark }, subscription) {
  let isNegated = false;
  let processedPattern = routePattern;

  // Check if the pattern starts with '!' indicating negation
  if (processedPattern.indexOf('!') === 0) {
    isNegated = true;
    processedPattern = processedPattern.substr(1);
  }

  // Replace specific regex patterns with '!' and '#'
  processedPattern = processedPattern.replace(Em9, '!').replace(Um9, '#');

  // Generate a matcher or processed object from the pattern
  const matcher = Sm9(processedPattern);

  // Create and return the SRA instance
  return new SRA(routePattern, routeMark, processedPattern, subscription, isNegated, matcher);
}

module.exports = createSRAInstance;