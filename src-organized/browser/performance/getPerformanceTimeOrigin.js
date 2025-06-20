/**
 * Retrieves the performance time origin from the Hv1.otperformance object.
 * Falls back to the fetchStart time if timeOrigin is not a number.
 *
 * @returns {number|undefined} The time origin timestamp in milliseconds, or undefined if not available.
 */
function getPerformanceTimeOrigin() {
  // Attempt to get the timeOrigin property from the performance object
  let timeOrigin = Hv1.otperformance.timeOrigin;

  // If timeOrigin is not a valid number, fall back to fetchStart from timing
  if (typeof timeOrigin !== "number") {
    const performanceObject = Hv1.otperformance;
    // Check if timing and fetchStart exist, then use fetchStart as the time origin
    timeOrigin = performanceObject.timing && performanceObject.timing.fetchStart;
  }

  return timeOrigin;
}

module.exports = getPerformanceTimeOrigin;