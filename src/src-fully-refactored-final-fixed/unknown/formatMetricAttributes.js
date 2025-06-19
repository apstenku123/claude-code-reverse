/**
 * Formats metric attributes into a standardized object for export.
 *
 * @param {Object} metricData - The metric data object containing attributes, start time, end time, and value.
 * @param {Object} valueTypeConfig - The configuration object specifying the value type (e.g., INT, DOUBLE).
 * @param {Object} timeEncoder - Utility object with encodeHrTime method for encoding time values.
 * @returns {Object} Formatted metric attributes object, including encoded times and value in the appropriate type property.
 */
function formatMetricAttributes(metricData, valueTypeConfig, timeEncoder) {
  // Convert metric attributes to export format
  const formattedMetric = {
    attributes: Is.toAttributes(metricData.attributes),
    startTimeUnixNano: timeEncoder.encodeHrTime(metricData.startTime),
    timeUnixNano: timeEncoder.encodeHrTime(metricData.endTime)
  };

  // Set the value property based on the metric value type
  switch (valueTypeConfig) {
    case KR0.ValueType.INT:
      formattedMetric.asInt = metricData.value;
      break;
    case KR0.ValueType.DOUBLE:
      formattedMetric.asDouble = metricData.value;
      break;
    // Add more cases here if new value types are introduced in the future
  }

  return formattedMetric;
}

module.exports = formatMetricAttributes;