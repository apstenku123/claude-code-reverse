/**
 * Factory function to create a new SRA (Subscription Route Activity) instance.
 * Processes the provided pattern string, applies necessary transformations, and initializes the SRA object.
 *
 * @param {Object} options - Configuration options for creating the SRA.
 * @param {string} options.pattern - The pattern string to match against routes.
 * @param {Function} options.mark - Function to mark an activity if not finished.
 * @param {Function} generateRandomNumberUpToSixteen - Function to generate a random number (0 <= n < 16).
 * @returns {SRA} a new SRA instance configured with the processed pattern and provided options.
 */
function createSubscriptionRouteActivity(
  { pattern: routePattern, mark: addActivityIfNotFinished },
  generateRandomNumberUpToSixteen
) {
  let isNegated = false;
  let processedPattern = routePattern;

  // Check if the pattern starts with '!' indicating negation
  if (processedPattern.indexOf('!') === 0) {
    isNegated = true;
    processedPattern = processedPattern.substr(1);
  }

  // Replace custom tokens in the pattern
  // Em9: RegExp for '!' tokens, replaced with '!'
  // Um9: RegExp for '#' tokens, replaced with '#'
  processedPattern = processedPattern.replace(Em9, '!').replace(Um9, '#');

  // Apply additional bound subscriptions to the pattern
  const boundSubscriptions = applyBoundSubscriptions(processedPattern);

  // Create and return the SRA instance
  return new SRA(
    routePattern,                 // Original pattern
    addActivityIfNotFinished,     // Activity marker function
    processedPattern,             // Processed pattern string
    generateRandomNumberUpToSixteen, // Random number generator
    isNegated,                    // Whether the pattern is negated
    boundSubscriptions            // Result of bound subscriptions
  );
}

module.exports = createSubscriptionRouteActivity;