/**
 * Retrieves and normalizes navigation timing data from the browser'createInteractionAccessor Performance API.
 *
 * @returns {Object} An object containing navigation timing metrics relative to navigationStart, and navigation type.
 */
function getNavigationTimingData() {
  // Get the performance timing object from the global window object
  const performanceTiming = Lc.WINDOW.performance.timing;
  // Get the navigation type (0: navigate, 1: reload, 2: back_forward)
  const navigationType = Lc.WINDOW.performance.navigation.type;

  // Build the result object with entryType, startTime, and a human-readable navigation type
  const navigationTimingData = {
    entryType: "navigation",
    startTime: 0,
    type:
      navigationType === 2
        ? "back_forward"
        : navigationType === 1
        ? "reload"
        : "navigate"
  };

  // Iterate over all properties in the performance timing object
  for (const timingKey in performanceTiming) {
    // Exclude 'navigationStart' (used as the baseline) and 'toJSON' (a method)
    if (timingKey !== "navigationStart" && timingKey !== "toJSON") {
      // Calculate the time relative to navigationStart, ensuring non-negative values
      navigationTimingData[timingKey] = Math.max(
        performanceTiming[timingKey] - performanceTiming.navigationStart,
        0
      );
    }
  }

  return navigationTimingData;
}

module.exports = getNavigationTimingData;
