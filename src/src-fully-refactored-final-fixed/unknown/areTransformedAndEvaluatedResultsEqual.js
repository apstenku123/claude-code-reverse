/**
 * Compares the results of two evaluation functions (setSubscriptionToEndOfDay and eT2) on a subscription derived from a source observable and configuration.
 *
 * @param {Observable} sourceObservable - The source observable to subscribe to.
 * @param {Object} config - Configuration object, may contain an 'in' property used for subscription.
 * @returns {boolean} True if the numeric results of setSubscriptionToEndOfDay and eT2 are equal, false otherwise.
 */
function areTransformedAndEvaluatedResultsEqual(sourceObservable, config) {
  // Create a subscription using the MW function, passing the source observable and config.in
  const subscription = MW(sourceObservable, config?.in);

  // Evaluate both setSubscriptionToEndOfDay and eT2 with the subscription and config, convert results to numbers, and compare
  const transformedResult = +setSubscriptionToEndOfDay(subscription, config);
  const evaluatedResult = +eT2(subscription, config);

  // Return true if both results are numerically equal
  return transformedResult === evaluatedResult;
}

module.exports = areTransformedAndEvaluatedResultsEqual;