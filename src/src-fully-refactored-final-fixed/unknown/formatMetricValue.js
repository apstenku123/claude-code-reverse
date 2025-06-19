/**
 * Formats a metric value object for export, converting attributes and encoding time fields.
 *
 * @param {Object} metricData - The metric data object containing attributes, startTime, endTime, and value.
 * @param {Object} valueType - The value type configuration (e.g., INT, DOUBLE) used to determine the value field.
 * @param {Object} timeEncoder - Utility object with encodeHrTime method for encoding time fields.
 * @returns {Object} The formatted metric value object with encoded times and appropriate value field.
 */
function formatMetricValue(metricData, valueType, timeEncoder) {
  // Convert attributes using external utility
  const formattedMetric = {
    attributes: Is.toAttributes(metricData.attributes),
    startTimeUnixNano: timeEncoder.encodeHrTime(metricData.startTime),
    timeUnixNano: timeEncoder.encodeHrTime(metricData.endTime)
  };

  // Set the value field based on the value type
  switch (valueType) {
    case KR0.ValueType.INT:
      formattedMetric.asInt = metricData.value;
      break;
    case KR0.ValueType.DOUBLE:
      formattedMetric.asDouble = metricData.value;
      break;
    // Additional value types can be handled here if needed
  }

  return formattedMetric;
}

module.exports = formatMetricValue;