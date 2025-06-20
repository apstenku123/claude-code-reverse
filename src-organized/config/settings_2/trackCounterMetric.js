/**
 * Tracks a counter metric by invoking the addMetricValue function with the COUNTER_METRIC_TYPE.
 *
 * @param {string} metricName - The name of the metric to track.
 * @param {number} [incrementValue=1] - The value to increment the counter by (defaults to 1).
 * @param {object} [options] - Additional options or context for the metric tracking.
 * @returns {void}
 */
function trackCounterMetric(metricName, incrementValue = 1, options) {
  // Call the external addMetricValue function with the counter metric type and provided arguments
  addMetricValue(C91.COUNTER_METRIC_TYPE, metricName, incrementValue, options);
}

module.exports = trackCounterMetric;