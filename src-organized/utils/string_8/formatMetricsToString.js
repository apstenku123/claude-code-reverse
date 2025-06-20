/**
 * Formats an array of metric objects into a string representation suitable for export or logging.
 * Each metric is represented in the format:
 *   name@unit:metric|metricType|#tag1:value1,tag2:value2|Ttimestamp\n
 * Tags are included only if present. Each metric is separated by a newline.
 *
 * @param {Array<Object>} metrics - Array of metric objects to format. Each object should have:
 *   - name {string}: The metric name
 *   - unit {string}: The unit of measurement
 *   - metric {string|number}: The metric value
 *   - metricType {string}: The type of metric (e.g., gauge, counter)
 *   - tags {Object}: Key-value pairs of tags (optional)
 *   - timestamp {string|number}: The timestamp for the metric
 * @returns {string} The formatted metrics string
 */
function formatMetricsToString(metrics) {
  let formattedMetrics = "";

  for (const metric of metrics) {
    // Extract tags as an array of [key, value] pairs
    const tagEntries = Object.entries(metric.tags);
    // Format tags if present
    const formattedTags = tagEntries.length > 0
      ? `|#${tagEntries.map(([tagKey, tagValue]) => `${tagKey}:${tagValue}`).join(",")}`
      : "";
    // Build the metric string in the required format
    formattedMetrics += `${metric.name}@${metric.unit}:${metric.metric}|${metric.metricType}${formattedTags}|BugReportForm${metric.timestamp}\n`;
  }

  return formattedMetrics;
}

module.exports = formatMetricsToString;