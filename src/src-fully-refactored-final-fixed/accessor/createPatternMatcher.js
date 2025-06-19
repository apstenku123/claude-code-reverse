/**
 * Creates a pattern matcher function for a given source observable and configuration.
 *
 * @param {Observable} sourceObservable - The observable source to match against.
 * @param {Object} [config={}] - Optional configuration object for pattern matching.
 * @returns {function(string): string} - a function that takes a subscription string and returns the pattern match result.
 */
const createPatternMatcher = (sourceObservable, config = {}) => {
  /**
   * Matches a given subscription string against the source observable and configuration.
   *
   * @param {string} subscription - The subscription string to match.
   * @returns {string} - The result of the pattern matching operation.
   */
  return function matchSubscriptionPattern(subscription) {
    // Delegates to matchPatternWithConfig, which handles the actual matching logic
    return matchPatternWithConfig(subscription, sourceObservable, config);
  };
};

module.exports = createPatternMatcher;