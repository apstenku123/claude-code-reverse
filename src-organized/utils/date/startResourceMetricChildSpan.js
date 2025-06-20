/**
 * Starts a child span for a browser resource metric in the tracing system.
 *
 * This function calculates the start and end timestamps for a resource metric event,
 * then starts a child span on the provided parent span/transaction with descriptive metadata.
 *
 * @param {Object} parentSpan - The parent span or transaction to which the child span will be attached.
 * @param {Object} resourceEntry - The resource entry object containing metadata (e.g., name, entryType).
 * @param {number} resourceStartOffset - The offset (in ms or createInteractionAccessor) to add to the base timestamp for the resource start.
 * @param {number} resourceDuration - The duration (in ms or createInteractionAccessor) of the resource event.
 * @param {number} baseTimestamp - The base timestamp (in ms or createInteractionAccessor) from which offsets are calculated.
 * @returns {number} The computed start timestamp for the resource metric child span.
 */
function startResourceMetricChildSpan(parentSpan, resourceEntry, resourceStartOffset, resourceDuration, baseTimestamp) {
  // Calculate the start timestamp for the resource metric
  const resourceStartTimestamp = baseTimestamp + resourceStartOffset;
  // Calculate the end timestamp for the resource metric
  const resourceEndTimestamp = resourceStartTimestamp + resourceDuration;

  // Start a child span with the appropriate metadata
  FU._startChild(parentSpan, {
    description: resourceEntry.name,
    endTimestamp: resourceEndTimestamp,
    op: resourceEntry.entryType,
    origin: "auto.resource.browser.metrics",
    startTimestamp: resourceStartTimestamp
  });

  // Return the start timestamp for further use
  return resourceStartTimestamp;
}

module.exports = startResourceMetricChildSpan;