/**
 * Checks if any subscription derived from the given observable matches any of the provided patterns.
 *
 * @param {Object} sourceObservable - The observable object to extract subscriptions from.
 * @param {Array<string>} patterns - An array of string patterns to match against the subscriptions.
 * @returns {boolean} True if at least one subscription matches any pattern; otherwise, false.
 */
function doesAnySubscriptionMatchPatterns(sourceObservable, patterns) {
  // If the observable has a 'type' property, or patterns is falsy or empty, return false early
  if (sourceObservable.type || !patterns || !patterns.length) {
    return false;
  }

  // Extract subscriptions from the observable using extractEventMessages
  const subscriptions = extractEventMessages(sourceObservable);

  // Check if any subscription matches any of the provided patterns
  return subscriptions.some(subscription => ZI.stringMatchesSomePattern(subscription, patterns));
}

module.exports = doesAnySubscriptionMatchPatterns;