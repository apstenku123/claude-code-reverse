/**
 * Creates a metric definition object with validated name and defaulted properties.
 *
 * @param {string} metricName - The name of the metric. Must be an ASCII string with a maximum length of 255 characters.
 * @param {string} metricType - The type of the metric (e.g., counter, gauge).
 * @param {Object} [metricOptions={}] - Additional options for the metric.
 * @param {string} [metricOptions.description] - a description of the metric.
 * @param {string} [metricOptions.unit] - The unit of measurement for the metric.
 * @param {string} [metricOptions.valueType] - The value type of the metric (e.g., DOUBLE, INT).
 * @param {Object} [metricOptions.advice] - Additional advice or metadata for the metric.
 * @returns {Object} The constructed metric definition object.
 */
function createMetricDefinition(metricName, metricType, metricOptions = {}) {
  // Validate the metric name using the external BugReportForm$0 function
  if (!BugReportForm$0(metricName)) {
    createDebouncedFunction$0.diag.warn(
      `Invalid metric name: "${metricName}". The metric name should be an ASCII string with a length no greater than 255 characters.`
    );
  }

  // Construct and return the metric definition object
  return {
    name: metricName,
    type: metricType,
    description: metricOptions?.description ?? "",
    unit: metricOptions?.unit ?? "",
    valueType: metricOptions?.valueType ?? createDebouncedFunction$0.ValueType.DOUBLE,
    advice: metricOptions?.advice ?? {}
  };
}

module.exports = createMetricDefinition;