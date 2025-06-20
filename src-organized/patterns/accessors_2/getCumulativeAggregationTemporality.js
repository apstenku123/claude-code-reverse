/**
 * Returns the CUMULATIVE aggregation temporality constant from the vo4 module.
 *
 * @param {any} sourceObservable - The observable or source object (not used in this function).
 * @returns {any} The CUMULATIVE aggregation temporality constant from vo4.AggregationTemporality.
 */
const getCumulativeAggregationTemporality = (sourceObservable) => {
  // Always returns the CUMULATIVE aggregation temporality constant
  return vo4.AggregationTemporality.CUMULATIVE;
};

module.exports = getCumulativeAggregationTemporality;
