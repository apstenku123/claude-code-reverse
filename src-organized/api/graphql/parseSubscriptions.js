/**
 * Parses a string of subscriptions, splitting and matching each subscription string
 * against a set of matcher classes. Returns an array of arrays, where each inner array
 * contains matcher instances for each subscription segment.
 *
 * @param {string} subscriptionsString - The string containing subscriptions to parse.
 * @param {Object} [config={}] - Optional configuration object passed to matcher constructors.
 * @returns {Array<Array<Object>>} Array of arrays of matcher instances for each subscription segment.
 */
function parseSubscriptions(subscriptionsString, config = {}) {
  // Split the input string by the global subscription delimiter
  return subscriptionsString.split(BK5).map(subscriptionSegment => {
    // Split the segment by the secondary delimiter, trim, and filter out empty entries
    const subscriptionParts = subscriptionSegment
      .trim()
      .split(AK5)
      .filter(part => part && !!part.trim());

    const matcherInstances = [];

    // For each part of the subscription, attempt to match using matcher classes
    for (let partIndex = 0, partsLength = subscriptionParts.length; partIndex < partsLength; partIndex += 1) {
      const subscriptionPart = subscriptionParts[partIndex];
      let isMatched = false;
      let matcherIndex = -1;

      // First, try to match using isMultiMatch on each matcher class
      while (!isMatched && ++matcherIndex < ER2) {
        const MatcherClass = $1A[matcherIndex];
        const multiMatchResult = MatcherClass.isMultiMatch(subscriptionPart);
        if (multiMatchResult) {
          matcherInstances.push(new MatcherClass(multiMatchResult, config));
          isMatched = true;
        }
      }
      if (isMatched) continue;

      // If no multi-match, try isSingleMatch on each matcher class
      matcherIndex = -1;
      while (++matcherIndex < ER2) {
        const MatcherClass = $1A[matcherIndex];
        const singleMatchResult = MatcherClass.isSingleMatch(subscriptionPart);
        if (singleMatchResult) {
          matcherInstances.push(new MatcherClass(singleMatchResult, config));
          break;
        }
      }
    }
    return matcherInstances;
  });
}

module.exports = parseSubscriptions;