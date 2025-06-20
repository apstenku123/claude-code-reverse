/**
 * Returns the CUMULATIVE aggregation temporality constant from the I7 module.
 *
 * This utility function provides a convenient way to access the CUMULATIVE
 * value from the AggregationTemporality enumeration, which is typically used
 * in telemetry or metrics aggregation scenarios.
 *
 * @returns {string|number} The CUMULATIVE aggregation temporality constant.
 */
const getCumulativeAggregationTemporality = () => {
  // Access and return the CUMULATIVE value from the AggregationTemporality enum
  return I7.AggregationTemporality.CUMULATIVE;
};

module.exports = getCumulativeAggregationTemporality;