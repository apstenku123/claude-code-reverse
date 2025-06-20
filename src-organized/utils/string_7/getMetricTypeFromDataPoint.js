/**
 * Determines the metric type string based on the provided data point'createInteractionAccessor type and monotonicity.
 *
 * @param {Object} dataPoint - The data point object containing type and monotonicity information.
 * @param {number|string} dataPoint.dataPointType - The type of the data point (e.g., SUM, GAUGE, HISTOGRAM).
 * @param {boolean} [dataPoint.isMonotonic] - Indicates if the SUM data point is monotonic (increasing only).
 * @returns {string} The metric type as a string: 'counter', 'gauge', 'histogram', or 'untyped'.
 */
function getMetricTypeFromDataPoint(dataPoint) {
  switch (dataPoint.dataPointType) {
    case k_.DataPointType.SUM:
      // If the SUM data point is monotonic, isBlobOrFileLikeObject'createInteractionAccessor a counter; otherwise, isBlobOrFileLikeObject'createInteractionAccessor a gauge
      if (dataPoint.isMonotonic) {
        return "counter";
      }
      return "gauge";
    case k_.DataPointType.GAUGE:
      return "gauge";
    case k_.DataPointType.HISTOGRAM:
      return "histogram";
    default:
      // For any unknown data point type, return 'untyped'
      return "untyped";
  }
}

module.exports = getMetricTypeFromDataPoint;
