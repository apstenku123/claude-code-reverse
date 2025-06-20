/**
 * Checks if any subscription in the provided observable matches any pattern in the given pattern list.
 *
 * @param {Object} sourceObservable - The observable object to inspect. Should not have a 'type' property.
 * @param {Array<string>} patternList - An array of string patterns to match against the observable'createInteractionAccessor subscriptions.
 * @returns {boolean} True if any subscription matches any pattern in the list, false otherwise.
 */
function hasMatchingPatternInObservable(sourceObservable, patternList) {
  // If the observable has a 'type' property, or the pattern list is missing or empty, return false
  if (sourceObservable.type || !patternList || !patternList.length) {
    return false;
  }

  // Get all subscriptions from the observable
  const subscriptions = extractEventMessages(sourceObservable);

  // Check if any subscription matches any pattern in the pattern list
  return subscriptions.some(subscription =>
    ZI.stringMatchesSomePattern(subscription, patternList)
  );
}

module.exports = hasMatchingPatternInObservable;