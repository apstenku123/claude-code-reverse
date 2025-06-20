/**
 * Starts a child span for browser metrics using timing information from the provided config object.
 *
 * @param {object} parentSpan - The parent span or observable to which the child span will be attached.
 * @param {object} timingConfig - An object containing timing data with start and end properties.
 * @param {string} metricName - The base name of the metric (used to construct property keys).
 * @param {number} baseTimestamp - The base timestamp (in ms or createInteractionAccessor) to which offsets are added.
 * @param {string} [description] - Optional description for the span; defaults to metricName if not provided.
 * @param {string} [customEndKey] - Optional custom key for the end time in timingConfig; if not provided, uses `${metricName}End`.
 * @returns {void}
 */
function startBrowserMetricChildSpan(parentSpan, timingConfig, metricName, baseTimestamp, description, customEndKey) {
  // Determine the end time value: use customEndKey if provided, otherwise use the default key
  const endKey = customEndKey ? customEndKey : `${metricName}End`;
  const endTime = timingConfig[endKey];
  const startTime = timingConfig[`${metricName}Start`];

  // If either start or end time is missing, do not proceed
  if (!startTime || !endTime) return;

  // Start a child span with the computed timestamps and metadata
  FU._startChild(parentSpan, {
    op: "browser",
    origin: "auto.browser.browser.metrics",
    description: description || metricName,
    startTimestamp: baseTimestamp + convertMillisecondsToSeconds(startTime),
    endTimestamp: baseTimestamp + convertMillisecondsToSeconds(endTime)
  });
}

module.exports = startBrowserMetricChildSpan;