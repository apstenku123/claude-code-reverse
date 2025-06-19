/**
 * Adds a value to a specified metric using the MetricsAggregator integration, including optional metadata.
 *
 * @param {string} metricType - The type/category of the metric (e.g., 'counter', 'gauge').
 * @param {string} metricName - The name/identifier of the metric.
 * @param {number} metricValue - The value to add to the metric.
 * @param {Object} [options={}] - Optional metadata for the metric.
 * @param {string} [options.unit] - The unit of the metric value (e.g., 'ms', 'bytes').
 * @param {Object} [options.tags] - Additional tags to associate with the metric.
 * @param {number} [options.timestamp] - Optional timestamp for the metric.
 * @returns {void}
 *
 * If the MetricsAggregator integration is not enabled, logs a warning (in debug mode) and does nothing.
 */
function addMetricValue(metricType, metricName, metricValue, options = {}) {
  const client = xQA.getClient();
  const currentScope = xQA.getCurrentScope();

  if (!client) {
    // No client available; cannot proceed
    return;
  }

  if (!client.metricsAggregator) {
    // MetricsAggregator integration is missing; warn in debug mode
    if (yQA.DEBUG_BUILD) {
      kQA.logger.warn(
        "No metrics aggregator enabled. Please add the MetricsAggregator integration to use metrics APIs"
      );
    }
    return;
  }

  // Destructure optional metric metadata
  const {
    unit: metricUnit,
    tags: metricTags,
    timestamp: metricTimestamp
  } = options;

  // Extract release and environment from client options
  const {
    release: releaseVersion,
    environment: environmentName
  } = client.getOptions();

  // Get the current transaction from the scope
  const currentTransaction = currentScope.getTransaction();

  // Prepare additional context to send with the metric
  const metricContext = {};
  if (releaseVersion) {
    metricContext.release = releaseVersion;
  }
  if (environmentName) {
    metricContext.environment = environmentName;
  }
  if (currentTransaction) {
    // Attach transaction description if available
    metricContext.transaction = D29.spanToJSON(currentTransaction).description || "";
  }

  // Log the metric addition in debug mode
  if (yQA.DEBUG_BUILD) {
    kQA.logger.log(
      `Adding value of ${metricValue} to ${metricType} metric ${metricName}`
    );
  }

  // Add the metric value using the aggregator
  client.metricsAggregator.add(
    metricType,
    metricName,
    metricValue,
    metricUnit,
    {
      ...metricContext,
      ...metricTags
    },
    metricTimestamp
  );
}

module.exports = addMetricValue;