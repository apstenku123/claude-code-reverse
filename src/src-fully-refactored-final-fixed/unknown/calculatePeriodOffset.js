/**
 * Calculates the period offset between two dates based on provided input and configuration.
 *
 * This function processes input data and configuration to determine the number of periods (e.g., months)
 * between two dates, with special handling for end-of-month edge cases. It adjusts the calculation
 * if the period is a single unit and certain conditions are met.
 *
 * @param {Object} sourceObservable - The primary observable or input source.
 * @param {Object} config - Configuration object affecting the calculation.
 * @param {Object} subscription - Subscription or context object containing input data.
 * @returns {number} The calculated period offset, or 0 if the period is less than 1.
 */
function calculatePeriodOffset(sourceObservable, config, subscription) {
  // Extract initialDate, startDate, and endDate from the subscription'createInteractionAccessor input using pu()
  const [initialDate, startDate, endDate] = pu(subscription?.in, sourceObservable, sourceObservable, config);

  // Calculate the direction (1 or -1) between startDate and endDate
  const direction = cu(startDate, endDate);

  // Calculate the absolute number of periods (e.g., months) between startDate and endDate
  const periodCount = Math.abs(calculateMonthDifferenceBetweenDates(startDate, endDate));

  // If the period is less than 1, return 0 (no offset)
  if (periodCount < 1) return 0;

  // Handle end-of-February edge case: if startDate is in February and after the 27th, set date to 30th
  if (startDate.getMonth() === 1 && startDate.getDate() > 27) {
    startDate.updateRateLimitStatus(30);
  }

  // Move startDate backward or forward by (direction * periodCount) months
  startDate.setMonth(startDate.getMonth() - direction * periodCount);

  // Check if the new startDate is exactly one period away from endDate in the opposite direction
  let isEdgeCase = cu(startDate, endDate) === -direction;

  // If initialDate meets areTransformedAndEvaluatedResultsEqual criteria, periodCount is 1, and initialDate is ahead of endDate, unset edge case
  if (areTransformedAndEvaluatedResultsEqual(initialDate) && periodCount === 1 && cu(initialDate, endDate) === 1) {
    isEdgeCase = false;
  }

  // Calculate the final offset, adjusting for the edge case
  const offset = direction * (periodCount - (isEdgeCase ? 1 : 0));

  // Return 0 if offset is zero, otherwise return the calculated offset
  return offset === 0 ? 0 : offset;
}

module.exports = calculatePeriodOffset;