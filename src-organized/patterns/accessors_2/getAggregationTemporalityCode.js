/**
 * Returns a numeric code representing the given AggregationTemporality type.
 *
 * @param {number} aggregationTemporality - The AggregationTemporality enum value to convert.
 * @returns {number|undefined} Returns 1 for DELTA, 2 for CUMULATIVE, or undefined for unknown values.
 */
function getAggregationTemporalityCode(aggregationTemporality) {
  switch (aggregationTemporality) {
    case $g.AggregationTemporality.DELTA:
      // DELTA temporality maps to code 1
      return 1;
    case $g.AggregationTemporality.CUMULATIVE:
      // CUMULATIVE temporality maps to code 2
      return 2;
    default:
      // If the temporality is not recognized, return undefined
      return undefined;
  }
}

module.exports = getAggregationTemporalityCode;