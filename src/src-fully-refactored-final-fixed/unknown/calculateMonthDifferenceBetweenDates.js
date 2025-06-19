/**
 * Calculates the total number of months difference between two dates.
 *
 * This function uses the `pu` helper to extract two date objects from the provided subscription input,
 * then computes the difference in months between them.
 *
 * @param {any} sourceObservable - The source observable or date-like object.
 * @param {any} config - Configuration or context object used by the `pu` helper.
 * @param {object} subscription - An object that may contain an `in` property, used as input for `pu`.
 * @returns {number} The total number of months difference between the two dates extracted by `pu`.
 */
function calculateMonthDifferenceBetweenDates(sourceObservable, config, subscription) {
  // Extract two date objects using the pu helper function
  const [startDate, endDate] = pu(subscription?.in, sourceObservable, config);

  // Calculate the difference in years and months
  const yearDifference = startDate.getFullYear() - endDate.getFullYear();
  const monthDifference = startDate.getMonth() - endDate.getMonth();

  // Total months difference
  const totalMonthsDifference = yearDifference * 12 + monthDifference;

  return totalMonthsDifference;
}

module.exports = calculateMonthDifferenceBetweenDates;