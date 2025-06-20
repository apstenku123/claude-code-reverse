/**
 * Determines if the computed end-of-next-month date is equal to the result of a transformation.
 *
 * This function applies a utility function (applyUuWithFallback) to a source observable and an optional configuration input,
 * then compares the numeric value of the result of setSubscriptionToEndOfDay(an external transformation) and getEndOfNextMonthDate
 * (which calculates the end of the next month) using strict equality.
 *
 * @param {any} sourceObservable - The source observable or data input to process.
 * @param {Object} [config] - Optional configuration object. May contain an 'in' property for input override and other settings.
 * @returns {boolean} True if the numeric results of setSubscriptionToEndOfDay and getEndOfNextMonthDate are equal; otherwise, false.
 */
function isNextMonthEndDateEqual(sourceObservable, config) {
  // Apply the utility function with the source observable and optional input override
  const subscription = applyUuWithFallback(sourceObservable, config?.in);

  // Compute the numeric value of the external transformation
  const transformedValue = +setSubscriptionToEndOfDay(subscription, config);

  // Compute the numeric value of the end of next month date
  const endOfNextMonthValue = +getEndOfNextMonthDate(subscription, config);

  // Return true if both numeric values are equal
  return transformedValue === endOfNextMonthValue;
}

module.exports = isNextMonthEndDateEqual;