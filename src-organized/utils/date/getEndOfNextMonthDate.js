/**
 * Returns a Date object representing the last moment (23:59:59.999) of the next month
 * based on a merged observable and optional configuration.
 *
 * @param {any} sourceObservable - The source observable or date-like object to merge with config.
 * @param {Object} [config] - Optional configuration object, may contain an 'in' property.
 * @returns {Date} a Date object set to the last millisecond of the next month.
 */
function getEndOfNextMonthDate(sourceObservable, config) {
  // Merge the source observable with the configuration (if provided)
  const mergedDate = mergeWithConfig(sourceObservable, config?.in);

  // Get the current month (0-indexed)
  const currentMonth = mergedDate.getMonth();

  // Set the date to the last day of the next month
  // setFullYear(year, month + 1, 0) sets the date to the 0th day of the following month, which is the last day of the current month
  mergedDate.setFullYear(mergedDate.getFullYear(), currentMonth + 1, 0);

  // Set the time to the last millisecond of the day (23:59:59.999)
  mergedDate.setHours(23, 59, 59, 999);

  return mergedDate;
}

module.exports = getEndOfNextMonthDate;