/**
 * Formats an observable metric object into a structured export format based on its data point type.
 *
 * @param {Object} sourceObservable - The observable metric object containing descriptor and data point information.
 * @param {Object} context - Additional context or configuration used for data point transformation.
 * @returns {Object} a formatted metric object ready for export, containing the appropriate metric type and data points.
 */
function formatObservableMetric(sourceObservable, context) {
  // Extract basic metric descriptor information
  const formattedMetric = {
    name: sourceObservable.descriptor.name,
    description: sourceObservable.descriptor.description,
    unit: sourceObservable.descriptor.unit
  };

  // Determine the aggregation temporality for the metric
  const aggregationTemporality = getAggregationTemporalityCode(sourceObservable.aggregationTemporality);

  // Format the metric based on its data point type
  switch (sourceObservable.dataPointType) {
    case $g.DataPointType.SUM:
      // For SUM metrics, include aggregation temporality, monotonicity, and data points
      formattedMetric.sum = {
        aggregationTemporality: aggregationTemporality,
        isMonotonic: sourceObservable.isMonotonic,
        dataPoints: HR0(sourceObservable, context)
      };
      break;
    case $g.DataPointType.GAUGE:
      // For GAUGE metrics, only data points are needed
      formattedMetric.gauge = {
        dataPoints: HR0(sourceObservable, context)
      };
      break;
    case $g.DataPointType.HISTOGRAM:
      // For HISTOGRAM metrics, include aggregation temporality and histogram data points
      formattedMetric.histogram = {
        aggregationTemporality: aggregationTemporality,
        dataPoints: cA6(sourceObservable, context)
      };
      break;
    case $g.DataPointType.EXPONENTIAL_HISTOGRAM:
      // For EXPONENTIAL_HISTOGRAM metrics, include aggregation temporality and exponential histogram data points
      formattedMetric.exponentialHistogram = {
        aggregationTemporality: aggregationTemporality,
        dataPoints: lA6(sourceObservable, context)
      };
      break;
    // No default needed; function returns as-is if type is unrecognized
  }

  return formattedMetric;
}

module.exports = formatObservableMetric;