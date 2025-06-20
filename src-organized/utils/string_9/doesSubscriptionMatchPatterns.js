/**
 * Determines whether the subscription string extracted from the source object matches any of the provided patterns.
 *
 * @param {object} sourceObject - The object from which to extract the subscription string.
 * @param {string[]} patterns - An array of string patterns to match against the subscription string.
 * @returns {boolean} Returns true if there are no patterns, if the subscription string is not found, or if the subscription string matches at least one pattern.
 */
function doesSubscriptionMatchPatterns(sourceObject, patterns) {
  // If no patterns are provided or the patterns array is empty, always return true
  if (!patterns || !patterns.length) {
    return true;
  }

  // Extract the subscription string from the source object
  const subscriptionString = extractStackFramesFromEvent(sourceObject);

  // If the subscription string is not found, return true
  if (!subscriptionString) {
    return true;
  }

  // Check if the subscription string matches any of the provided patterns
  return ZI.stringMatchesSomePattern(subscriptionString, patterns);
}

module.exports = doesSubscriptionMatchPatterns;