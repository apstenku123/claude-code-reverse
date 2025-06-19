/**
 * Starts a child span for browser metrics if valid start and end timestamps are present in the config object.
 *
 * @param {object} parentSpan - The parent span or observable to which the child span will be attached.
 * @param {object} config - The configuration object containing metric timestamps.
 * @param {string} metricName - The base name of the metric (e.g., 'navigation', 'paint').
 * @param {number} baseTimestamp - The base timestamp (typically navigation start) to which metric offsets are added.
 * @param {string} [description] - Optional description for the span. If not provided, metricName is used.
 * @param {string} [customMetricKey] - Optional key to directly access the end metric in config. If not provided, uses `${metricName}End`.
 * @returns {void}
 */
function startBrowserMetricsChildSpan(parentSpan, config, metricName, baseTimestamp, description, customMetricKey) {
  // Determine the end metric value: use customMetricKey if provided, otherwise use metricName + 'End'
  const endMetricValue = customMetricKey ? config[customMetricKey] : config[`${metricName}End`];
  // Determine the start metric value: always metricName + 'Start'
  const startMetricValue = config[`${metricName}Start`];

  // If either start or end metric is missing or falsy, do not proceed
  if (!startMetricValue || !endMetricValue) return;

  // Start a child span for the browser metric
  FU._startChild(parentSpan, {
    op: "browser",
    origin: "auto.browser.browser.metrics",
    description: description || metricName,
    startTimestamp: baseTimestamp + convertMillisecondsToSeconds(startMetricValue),
    endTimestamp: baseTimestamp + convertMillisecondsToSeconds(endMetricValue)
  });
}

module.exports = startBrowserMetricsChildSpan;