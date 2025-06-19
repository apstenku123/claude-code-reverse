/**
 * Factory function to create a new SRA (Special Route Action) instance with processed pattern and configuration.
 *
 * @param {Object} options - Options for creating the SRA instance.
 * @param {string} options.pattern - The route pattern string, possibly prefixed with '!'.
 * @param {Object} options.mark - Configuration or marker object for the SRA instance.
 * @param {Object} subscription - The subscription or context object associated with the SRA instance.
 * @returns {SRA} Returns a new SRA instance with processed pattern and configuration.
 */
function createSRAInstance({ pattern: routePattern, mark: routeMark }, subscription) {
  let isNegated = false;
  let processedPattern = routePattern;

  // Check if the pattern starts with '!' (negation)
  if (processedPattern.indexOf('!') === 0) {
    isNegated = true;
    processedPattern = processedPattern.substr(1);
  }

  // Replace specific regex patterns in the route pattern
  processedPattern = processedPattern.replace(Em9, '!').replace(Um9, '#');

  // Generate a processed pattern key using Sm9
  const patternKey = Sm9(processedPattern);

  // Create and return the SRA instance
  return new SRA(routePattern, routeMark, processedPattern, subscription, isNegated, patternKey);
}

module.exports = createSRAInstance;