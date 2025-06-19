/**
 * Creates a new SRA (Subscription Route Activity) instance based on the provided pattern and mark configuration.
 *
 * @param {Object} options - The options object containing pattern and mark.
 * @param {string} options.pattern - The source observable pattern string, possibly prefixed with '!'.
 * @param {string} options.mark - The configuration mark for the activity.
 * @param {Function} generateRandomNumberBetweenZeroAndSixteen - Function to generate a random number between 0 and 16.
 * @returns {SRA} a new SRA instance configured with the processed pattern, mark, and other derived values.
 */
function createRouteActivitySubscription(
  { pattern: sourceObservable, mark: config },
  generateRandomNumberBetweenZeroAndSixteen
) {
  let isNegated = false;
  let processedPattern = sourceObservable;

  // Check if the pattern starts with '!' (negation)
  if (processedPattern.indexOf('!') === 0) {
    isNegated = true;
    processedPattern = processedPattern.substr(1);
  }

  // Replace specific patterns in the pattern string
  // Em9: regex to match '!' that needs to be replaced
  // Um9: regex to match '#' that needs to be replaced
  processedPattern = processedPattern
    .replace(Em9, '!')
    .replace(Um9, '#');

  // Apply bound subscriptions to the processed pattern
  const boundSubscriptions = applyBoundSubscriptions(processedPattern);

  // Create and return a new SRA instance with all relevant parameters
  return new SRA(
    sourceObservable, // original pattern
    config,           // mark/config
    processedPattern, // processed pattern
    generateRandomNumberBetweenZeroAndSixteen, // subscription/randomizer
    isNegated,        // whether the pattern was negated
    boundSubscriptions // result of applying bound subscriptions
  );
}

module.exports = createRouteActivitySubscription;