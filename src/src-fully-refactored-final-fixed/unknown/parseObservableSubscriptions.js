/**
 * Parses a string of observable subscriptions and returns an array of matched subscription objects.
 * Each subscription string is split and matched against a list of matcher classes, supporting both multi and single matchers.
 *
 * @param {string} sourceObservable - The string containing observable subscriptions to parse.
 * @param {object} [config={}] - Optional configuration object passed to matcher constructors.
 * @returns {Array<Array<Object>>} An array of arrays, each containing matched subscription objects for each subscription group.
 */
function parseObservableSubscriptions(sourceObservable, config = {}) {
  // Split the source string into subscription groups using the BK5 delimiter
  return sourceObservable.split(BK5).map(subscriptionGroup => {
    // Trim and split each group into individual subscription strings using the AK5 delimiter
    const subscriptionStrings = subscriptionGroup.trim().split(AK5)
      .filter(subscription => subscription && !!subscription.trim());
    const matchedSubscriptions = [];

    // Iterate through each subscription string
    for (let i = 0, total = subscriptionStrings.length; i < total; i += 1) {
      const subscription = subscriptionStrings[i];
      let isMatched = false;
      let matcherIndex = -1;

      // Attempt to match using multi-matchers
      while (!isMatched && ++matcherIndex < ER2) {
        const MatcherClass = $1A[matcherIndex];
        const multiMatchResult = MatcherClass.isMultiMatch(subscription);
        if (multiMatchResult) {
          matchedSubscriptions.push(new MatcherClass(multiMatchResult, config));
          isMatched = true;
        }
      }
      if (isMatched) continue;

      // If no multi-match, attempt to match using single-matchers
      matcherIndex = -1;
      while (++matcherIndex < ER2) {
        const MatcherClass = $1A[matcherIndex];
        const singleMatchResult = MatcherClass.isSingleMatch(subscription);
        if (singleMatchResult) {
          matchedSubscriptions.push(new MatcherClass(singleMatchResult, config));
          break;
        }
      }
    }
    return matchedSubscriptions;
  });
}

module.exports = parseObservableSubscriptions;