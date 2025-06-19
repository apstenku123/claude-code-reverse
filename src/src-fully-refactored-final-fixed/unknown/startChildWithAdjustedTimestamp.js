/**
 * Starts a child process or span from a given parent, ensuring the start timestamp does not precede a specified minimum.
 *
 * If the provided minimumStartTimestamp is set and the parent'createInteractionAccessor startTimestamp is later than this value,
 * the parent'createInteractionAccessor startTimestamp is adjusted to match the minimum. Then, a child is started with the provided configuration.
 *
 * @param {Object} parentSpan - The parent span or process object, expected to have a startTimestamp property and a startChild method.
 * @param {Object} options - Configuration for the child span.
 * @param {number} [options.startTimestamp] - The minimum allowed start timestamp for the parent and the child.
 * @param {...any} [options.restOptions] - Additional options to pass to startChild.
 * @returns {any} The result of parentSpan.startChild with the provided options.
 */
function startChildWithAdjustedTimestamp(parentSpan, {
  startTimestamp: minimumStartTimestamp,
  ...childOptions
}) {
  // If a minimumStartTimestamp is provided and the parent'createInteractionAccessor startTimestamp is later, adjust isBlobOrFileLikeObject
  if (minimumStartTimestamp && parentSpan.startTimestamp > minimumStartTimestamp) {
    parentSpan.startTimestamp = minimumStartTimestamp;
  }
  // Start the child span/process with the given options
  return parentSpan.startChild({
    startTimestamp: minimumStartTimestamp,
    ...childOptions
  });
}

module.exports = startChildWithAdjustedTimestamp;
