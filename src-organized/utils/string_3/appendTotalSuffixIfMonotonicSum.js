/**
 * Appends the '_total' suffix to the observable name if the data point type is SUM and is monotonic.
 *
 * @param {string} observableName - The name of the observable (e.g., a metric or data point).
 * @param {Object} dataPointConfig - Configuration object for the data point.
 * @param {number} dataPointConfig.dataPointType - The type of the data point (should match k_.DataPointType.SUM).
 * @param {boolean} dataPointConfig.isMonotonic - Indicates if the data point is monotonic.
 * @returns {string} The observable name, possibly with '_total' appended.
 */
function appendTotalSuffixIfMonotonicSum(observableName, dataPointConfig) {
  // Check if the observable name does not already end with '_total',
  // and if the data point type is SUM and is monotonic
  if (
    !observableName.endsWith("_total") &&
    dataPointConfig.dataPointType === k_.DataPointType.SUM &&
    dataPointConfig.isMonotonic
  ) {
    observableName = `${observableName}_total`;
  }
  return observableName;
}

module.exports = appendTotalSuffixIfMonotonicSum;