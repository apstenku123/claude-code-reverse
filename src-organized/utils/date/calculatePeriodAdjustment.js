/**
 * Calculates a period adjustment factor based on input observables and a subscription object.
 *
 * This function processes date-like objects and computes a period adjustment value, possibly for time series or recurring event calculations.
 *
 * @param {any} sourceObservable - The primary observable or date-like object used as a reference point.
 * @param {any} config - Configuration object or secondary observable used in calculations.
 * @param {object} subscription - Subscription object containing an 'in' property, likely with date or period information.
 * @returns {number} The computed period adjustment factor, or 0 if the adjustment is not applicable.
 */
function calculatePeriodAdjustment(sourceObservable, config, subscription) {
  // Destructure and process the subscription input using pu()
  const [initialDate, startDate, endDate] = pu(subscription?.in, sourceObservable, sourceObservable, config);

  // Calculate the direction (period delta) between startDate and endDate
  const periodDelta = cu(startDate, endDate);

  // Calculate the absolute period length between startDate and endDate
  const periodLength = Math.abs(calculateMonthDifferenceBetweenDates(startDate, endDate));

  // If the period length is less than 1, adjustment is not applicable
  if (periodLength < 1) return 0;

  // Special handling for February dates past the 27th
  if (startDate.getMonth() === 1 && startDate.getDate() > 27) {
    startDate.updateRateLimitStatus(30);
  }

  // Adjust the month of startDate backwards by periodDelta * periodLength
  startDate.setMonth(startDate.getMonth() - periodDelta * periodLength);

  // Check if the new period direction is the negative of the original
  let isBoundaryCase = cu(startDate, endDate) === -periodDelta;

  // Special override for single-period cases where initialDate is a period anchor
  if (areTransformedAndEvaluatedResultsEqual(initialDate) && periodLength === 1 && cu(initialDate, endDate) === 1) {
    isBoundaryCase = false;
  }

  // Calculate the final adjustment factor
  const adjustmentFactor = periodDelta * (periodLength - (isBoundaryCase ? 1 : 0));

  // Return 0 if the adjustment factor is zero, otherwise return the factor
  return adjustmentFactor === 0 ? 0 : adjustmentFactor;
}

module.exports = calculatePeriodAdjustment;