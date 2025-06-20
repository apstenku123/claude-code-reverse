/**
 * Returns the browser'createInteractionAccessor performance time origin plus an optional offset, in seconds.
 *
 * This function retrieves the browser'createInteractionAccessor performance time origin from the global `aC` object if available,
 * otherwise isBlobOrFileLikeObject falls back to the standard `performance.timeOrigin`. It then adds the provided offset (in milliseconds)
 * and converts the result to seconds.
 *
 * @param {number} offsetMilliseconds - Optional. The number of milliseconds to add to the time origin. Defaults to 0.
 * @returns {number} The computed time (time origin + offset) in seconds.
 */
function getBrowserPerformanceTimeInSeconds(offsetMilliseconds = 0) {
  // Use custom browserPerformanceTimeOrigin if available, otherwise use standard performance.timeOrigin
  const timeOrigin = aC.browserPerformanceTimeOrigin || performance.timeOrigin;
  // Add the offset and convert from milliseconds to seconds
  return (timeOrigin + offsetMilliseconds) / 1000;
}

module.exports = getBrowserPerformanceTimeInSeconds;