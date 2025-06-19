/**
 * Formats metric data from a source observable into a standardized object structure
 * based on the metric'createInteractionAccessor data point type (SUM, GAUGE, HISTOGRAM, EXPONENTIAL_HISTOGRAM).
 *
 * @param {Object} metricSource - The metric source object containing descriptor and data point information.
 * @param {Object} context - Additional context or configuration required for data point extraction.
 * @returns {Object} Formatted metric data object containing name, description, unit, and data point details.
 */
function formatMetricData(metricSource, context) {
  // Extract basic metric descriptor information
  const formattedMetric = {
    name: metricSource.descriptor.name,
    description: metricSource.descriptor.description,
    unit: metricSource.descriptor.unit
  };

  // Determine the aggregation temporality for the metric
  const aggregationTemporality = getAggregationTemporalityCode(metricSource.aggregationTemporality);

  // Format data points based on the metric'createInteractionAccessor data point type
  switch (metricSource.dataPointType) {
    case $g.DataPointType.SUM:
      // For SUM type, include aggregation temporality, monotonicity, and data points
      formattedMetric.sum = {
        aggregationTemporality: aggregationTemporality,
        isMonotonic: metricSource.isMonotonic,
        dataPoints: HR0(metricSource, context)
      };
      break;
    case $g.DataPointType.GAUGE:
      // For GAUGE type, include data points only
      formattedMetric.gauge = {
        dataPoints: HR0(metricSource, context)
      };
      break;
    case $g.DataPointType.HISTOGRAM:
      // For HISTOGRAM type, include aggregation temporality and data points
      formattedMetric.histogram = {
        aggregationTemporality: aggregationTemporality,
        dataPoints: cA6(metricSource, context)
      };
      break;
    case $g.DataPointType.EXPONENTIAL_HISTOGRAM:
      // For EXPONENTIAL_HISTOGRAM type, include aggregation temporality and data points
      formattedMetric.exponentialHistogram = {
        aggregationTemporality: aggregationTemporality,
        dataPoints: lA6(metricSource, context)
      };
      break;
    default:
      // No action for unknown data point types
      break;
  }

  return formattedMetric;
}

module.exports = formatMetricData;