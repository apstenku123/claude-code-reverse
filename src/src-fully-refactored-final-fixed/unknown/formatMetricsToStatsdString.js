/**
 * Converts an array of metric objects into a StatsD-formatted string.
 * Each metric object should have the following properties:
 * - name: Name of the metric
 * - unit: Unit of measurement
 * - metric: Metric value
 * - metricType: Type of metric (e.g., gauge, counter)
 * - tags: Object containing tag key-value pairs
 * - timestamp: Timestamp of the metric
 *
 * @param {Array<Object>} metrics - Array of metric objects to be formatted
 * @returns {string} StatsD-formatted string representing all metrics
 */
function formatMetricsToStatsdString(metrics) {
  let statsdString = "";

  for (const metric of metrics) {
    // Convert tags object to array of [key, value] pairs
    const tagEntries = Object.entries(metric.tags);
    // Format tags if present, otherwise use empty string
    const formattedTags = tagEntries.length > 0
      ? `|#${tagEntries.map(([tagKey, tagValue]) => `${tagKey}:${tagValue}`).join(",")}`
      : "";
    // Build the StatsD-formatted line for this metric
    statsdString += `${metric.name}@${metric.unit}:${metric.metric}|${metric.metricType}${formattedTags}|BugReportForm${metric.timestamp}\n`;
  }

  return statsdString;
}

module.exports = formatMetricsToStatsdString;