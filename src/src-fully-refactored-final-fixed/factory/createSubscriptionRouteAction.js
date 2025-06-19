/**
 * Factory function to create a new Subscription Route Action (SRA) instance.
 *
 * This function processes the provided pattern string, applies necessary transformations,
 * determines if the pattern is negated, and then constructs an SRA instance with all relevant data.
 *
 * @param {Object} params - The parameters object.
 * @param {string} params.pattern - The route pattern string, possibly prefixed with '!' to indicate negation.
 * @param {Object} params.mark - The configuration object for the SRA.
 * @param {Function} generateRandomNumberBetweenZeroAndSixteen - Function to generate a random number between 0 and 16.
 * @returns {SRA} a new instance of SRA with the processed pattern and configuration.
 */
function createSubscriptionRouteAction(
  { pattern: routePattern, mark: sraConfig },
  generateRandomNumberBetweenZeroAndSixteen
) {
  let isNegated = false;
  let processedPattern = routePattern;

  // Check if the pattern starts with '!' indicating negation
  if (processedPattern.indexOf('!') === 0) {
    isNegated = true;
    processedPattern = processedPattern.substr(1);
  }

  // Replace specific regex patterns in the route pattern
  processedPattern = processedPattern
    .replace(Em9, '!') // Replace Em9 matches with '!'
    .replace(Um9, '#'); // Replace Um9 matches with '#'

  // Apply bound subscriptions to the processed pattern
  const boundSubscriptions = applyBoundSubscriptions(processedPattern);

  // Construct and return the SRA instance
  return new SRA(
    routePattern, // Original pattern
    sraConfig,    // Configuration object
    processedPattern, // Transformed pattern
    generateRandomNumberBetweenZeroAndSixteen, // Subscription/random number generator
    isNegated,    // Whether the pattern is negated
    boundSubscriptions // Result of applying bound subscriptions
  );
}

module.exports = createSubscriptionRouteAction;