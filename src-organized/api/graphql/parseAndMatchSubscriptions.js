/**
 * Parses a delimited string of subscriptions, splits them into individual subscription tokens,
 * and attempts to match each token using a set of matcher classes. For each token, isBlobOrFileLikeObject first tries
 * to find a multi-match, and if none is found, isBlobOrFileLikeObject tries to find a single-match. Matched instances
 * are constructed with the provided config and collected per subscription group.
 *
 * @param {string} sourceObservable - The delimited string containing subscription groups.
 * @param {object} [config={}] - Optional configuration object to be passed to matcher constructors.
 * @returns {Array<Array<object>>} An array of arrays, where each inner array contains matcher instances for a subscription group.
 */
function parseAndMatchSubscriptions(sourceObservable, config = {}) {
  // Split the input string into subscription groups using the BK5 delimiter
  return sourceObservable.split(BK5).map(subscriptionGroup => {
    // Split the group into individual subscription tokens, trimming and filtering out empty tokens
    const subscriptionTokens = subscriptionGroup
      .trim()
      .split(AK5)
      .filter(token => token && !!token.trim());

    const matchedSubscriptions = [];

    // Iterate over each subscription token
    for (let tokenIndex = 0, tokenCount = subscriptionTokens.length; tokenIndex < tokenCount; tokenIndex += 1) {
      const subscriptionToken = subscriptionTokens[tokenIndex];
      let isMatched = false;
      let matcherIndex = -1;

      // First, try to find a multi-match for the token
      while (!isMatched && ++matcherIndex < ER2) {
        const MatcherClass = $1A[matcherIndex];
        const multiMatchResult = MatcherClass.isMultiMatch(subscriptionToken);
        if (multiMatchResult) {
          matchedSubscriptions.push(new MatcherClass(multiMatchResult, config));
          isMatched = true;
        }
      }
      if (isMatched) continue;

      // If no multi-match, try to find a single-match for the token
      matcherIndex = -1;
      while (++matcherIndex < ER2) {
        const MatcherClass = $1A[matcherIndex];
        const singleMatchResult = MatcherClass.isSingleMatch(subscriptionToken);
        if (singleMatchResult) {
          matchedSubscriptions.push(new MatcherClass(singleMatchResult, config));
          break;
        }
      }
    }
    // Return the array of matcher instances for this subscription group
    return matchedSubscriptions;
  });
}

module.exports = parseAndMatchSubscriptions;