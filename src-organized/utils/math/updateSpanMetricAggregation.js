/**
 * Updates or initializes metric aggregation data for the current active span.
 *
 * This function retrieves the current active span, then updates or creates a metric aggregation entry
 * for a given metric key. It tracks min, max, count, sum, and associated tags for the metric value.
 * The aggregation is stored in a WeakMap keyed by the active span.
 *
 * @param {string} metricSource - The source or type of the metric (e.g., event name).
 * @param {string} metricCategory - The category or sub-type of the metric.
 * @param {number} metricValue - The numeric value to aggregate (e.g., duration, count).
 * @param {string} instanceId - Unique identifier for the metric instance (e.g., span or transaction id).
 * @param {Object} metricTags - Tags or metadata associated with the metric.
 * @param {string|number} metricKey - The key under which to store the aggregation (e.g., metric name).
 * @returns {void}
 */
function updateSpanMetricAggregation(
  metricSource,
  metricCategory,
  metricValue,
  instanceId,
  metricTags,
  metricKey
) {
  // Retrieve the current active span (context for aggregation)
  const activeSpan = _t2.getActiveSpan();
  if (!activeSpan) return;

  // Retrieve existing aggregation map for the span, or create a new one
  const existingAggregationMap = LBA(activeSpan) || new Map();

  // Create a unique identifier for this metric aggregation
  const aggregationId = `${metricSource}:${metricCategory}@${instanceId}`;

  // Check if there is already an aggregation entry for this metricKey
  const existingEntry = existingAggregationMap.get(metricKey);

  if (existingEntry) {
    // Destructure the existing metric data
    const [, metricData] = existingEntry;
    // Update the aggregation data with the new value
    existingAggregationMap.set(metricKey, [
      aggregationId,
      {
        min: Math.min(metricData.min, metricValue),
        max: Math.max(metricData.max, metricValue),
        count: metricData.count + 1,
        sum: metricData.sum + metricValue,
        tags: metricData.tags
      }
    ]);
  } else {
    // Initialize a new aggregation entry for this metricKey
    existingAggregationMap.set(metricKey, [
      aggregationId,
      {
        min: metricValue,
        max: metricValue,
        count: 1,
        sum: metricValue,
        tags: metricTags
      }
    ]);
  }

  // Ensure the global WeakMap for span aggregations exists
  if (!Vc) {
    Vc = new WeakMap();
  }
  // Store the updated aggregation map for the active span
  Vc.set(activeSpan, existingAggregationMap);
}

module.exports = updateSpanMetricAggregation;