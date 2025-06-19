/**
 * Determines if the end-of-next-month date values, as calculated by two different methods, are equal for a given observable and configuration.
 *
 * @param {any} sourceObservable - The observable or data source to process.
 * @param {Object} config - Optional configuration object. May contain an 'in' property for additional input.
 * @returns {boolean} True if both methods return the same end-of-next-month date value; otherwise, false.
 */
function areNextMonthEndDatesEqual(sourceObservable, config) {
  // Obtain a subscription or processed value from the observable and config
  const subscription = MW(sourceObservable, config?.in);

  // Calculate the end-of-next-month date using two different methods
  // The unary plus (+) ensures both results are compared as numbers (e.g., timestamps)
  const firstEndOfNextMonth = +setSubscriptionToEndOfDay(subscription, config);
  const secondEndOfNextMonth = +eT2(subscription, config);

  // Return true if both calculated dates are equal
  return firstEndOfNextMonth === secondEndOfNextMonth;
}

module.exports = areNextMonthEndDatesEqual;