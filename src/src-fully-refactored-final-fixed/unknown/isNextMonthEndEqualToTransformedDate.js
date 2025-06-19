/**
 * Determines if the transformed date and the end of next month date are equal for a given source observable and configuration.
 *
 * @param {any} sourceObservable - The source observable or value to operate on.
 * @param {object} [config] - Optional configuration object. May contain an 'in' property for additional input.
 * @returns {boolean} True if the numeric values of the transformed date and the end of next month date are equal; otherwise, false.
 */
function isNextMonthEndEqualToTransformedDate(sourceObservable, config) {
  // Apply the 'applyUuWithFallback' utility to get the subscription based on the source and config
  const subscription = applyUuWithFallback(sourceObservable, config?.in);

  // Get the transformed date using the external 'setSubscriptionToEndOfDay' function
  const transformedDate = setSubscriptionToEndOfDay(subscription, config);

  // Get the end of next month date using the 'getEndOfNextMonthDate' utility
  const endOfNextMonthDate = getEndOfNextMonthDate(subscription, config);

  // Compare the numeric values of both dates for equality
  return +transformedDate === +endOfNextMonthDate;
}

module.exports = isNextMonthEndEqualToTransformedDate;