/**
 * Returns the browser'createInteractionAccessor performance time origin plus an optional offset, in seconds.
 *
 * This function retrieves the time origin from the browser'createInteractionAccessor performance API, or from the
 * global 'aC.browserPerformanceTimeOrigin' if available. It then adds the provided offset
 * (in milliseconds) and converts the result to seconds.
 *
 * @param {number} offsetMilliseconds - Optional. The number of milliseconds to add to the time origin. Defaults to 0.
 * @returns {number} The computed timestamp in seconds.
 */
function getBrowserPerformanceTimestampInSeconds(offsetMilliseconds = 0) {
  // Use custom time origin if available, otherwise fallback to the standard performance.timeOrigin
  const timeOrigin = aC.browserPerformanceTimeOrigin || performance.timeOrigin;

  // Add the offset and convert milliseconds to seconds
  return (timeOrigin + offsetMilliseconds) / 1000;
}

module.exports = getBrowserPerformanceTimestampInSeconds;