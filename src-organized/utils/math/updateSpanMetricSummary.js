/**
 * Updates or initializes a metric summary for a given span in the current active context.
 *
 * This function retrieves the current active span (if any), then updates or creates a summary entry
 * for a specific metric key. The summary tracks min, max, count, sum, and associated tags for the metric.
 * The summary is stored in a Map associated with the span using a WeakMap for efficient memory management.
 *
 * @param {string} metricSource - The source or type of the metric (e.g., event type).
 * @param {string} metricName - The name or identifier of the metric.
 * @param {number} metricValue - The value to record for this metric occurrence.
 * @param {string} instanceId - An identifier for the instance (e.g., user/session/trace).
 * @param {object} metricTags - An object containing tags or metadata for the metric.
 * @param {string} metricKey - The key under which to store this metric summary in the map.
 * @returns {void}
 */
function updateSpanMetricSummary(metricSource, metricName, metricValue, instanceId, metricTags, metricKey) {
  // Retrieve the currently active span from the tracing context
  const activeSpan = _t2.getActiveSpan();
  if (!activeSpan) return;

  // Attempt to retrieve the existing metric summary map for this span, or create a new one
  const metricSummaryMap = LBA(activeSpan) || new Map();

  // Create a unique identifier for this metric occurrence
  const metricIdentifier = `${metricSource}:${metricName}@${instanceId}`;

  // Check if a summary already exists for this metric key
  const existingSummaryEntry = metricSummaryMap.get(metricKey);

  if (existingSummaryEntry) {
    // Destructure the existing summary object
    const [, summary] = existingSummaryEntry;
    // Update the summary statistics
    summary.min = Math.min(summary.min, metricValue);
    summary.max = Math.max(summary.max, metricValue);
    summary.count += 1;
    summary.sum += metricValue;
    // Tags remain unchanged
    // Update the entry in the map with the new summary
    metricSummaryMap.set(metricKey, [metricIdentifier, summary]);
  } else {
    // Create a new summary entry for this metric key
    metricSummaryMap.set(metricKey, [metricIdentifier, {
      min: metricValue,
      max: metricValue,
      count: 1,
      sum: metricValue,
      tags: metricTags
    }]);
  }

  // Ensure the global WeakMap for span-to-summary mapping exists
  if (!Vc) {
    Vc = new WeakMap();
  }
  // Associate the updated metric summary map with the active span
  Vc.set(activeSpan, metricSummaryMap);
}

module.exports = updateSpanMetricSummary;