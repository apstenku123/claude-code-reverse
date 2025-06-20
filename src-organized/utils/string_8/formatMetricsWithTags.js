/**
 * Formats an array of metric objects into a specific string representation.
 * Each metric includes its name, unit, metric, metric type, timestamp, and optional tags.
 * Tags are appended in the format |#key:value,key2:value2 if present.
 *
 * @param {Array<Object>} metrics - Array of metric objects to format. Each object should have:
 *   - name {string}: The metric name
 *   - unit {string}: The unit of the metric
 *   - metric {string|number}: The metric value
 *   - metricType {string}: The type of the metric
 *   - timestamp {string|number}: The timestamp for the metric
 *   - tags {Object}: (optional) Key-value pairs of tags
 * @returns {string} The formatted string representing all metrics, one per line
 */
function formatMetricsWithTags(metrics) {
  let formattedMetrics = "";
  for (const metric of metrics) {
    // Extract tag entries as [key, value] pairs
    const tagEntries = Object.entries(metric.tags);
    // Format tags if present, otherwise use empty string
    const formattedTags = tagEntries.length > 0
      ? `|#${tagEntries.map(([tagKey, tagValue]) => `${tagKey}:${tagValue}`).join(",")}`
      : "";
    // Build the metric line according to the required format
    formattedMetrics += `${metric.name}@${metric.unit}:${metric.metric}|${metric.metricType}${formattedTags}|BugReportForm${metric.timestamp}\n`;
  }
  return formattedMetrics;
}

module.exports = formatMetricsWithTags;
