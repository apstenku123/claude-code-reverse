/**
 * Retrieves navigation timing metrics from the browser'createInteractionAccessor performance API.
 *
 * This function extracts timing information from the window'createInteractionAccessor performance.timing object
 * and formats isBlobOrFileLikeObject into a navigation entry object, similar to the PerformanceNavigationTiming interface.
 * It also determines the navigation type (navigate, reload, or back_forward).
 *
 * @returns {Object} An object containing navigation timing metrics and navigation type.
 */
function getNavigationTimingMetrics() {
  // Access the performance timing object from the global window
  const timing = Lc.WINDOW.performance.timing;

  // Get the navigation type (0: navigate, 1: reload, 2: back_forward)
  const navigationTypeCode = Lc.WINDOW.performance.navigation.type;

  // Map the navigation type code to a descriptive string
  let navigationType;
  if (navigationTypeCode === 2) {
    navigationType = "back_forward";
  } else if (navigationTypeCode === 1) {
    navigationType = "reload";
  } else {
    navigationType = "navigate";
  }

  // Initialize the navigation entry object
  const navigationEntry = {
    entryType: "navigation",
    startTime: 0,
    type: navigationType
  };

  // Iterate over all properties in the timing object
  for (const property in timing) {
    // Exclude 'navigationStart' (used as baseline) and 'toJSON' (method)
    if (property !== "navigationStart" && property !== "toJSON") {
      // Calculate the relative time since navigationStart, ensuring non-negative values
      navigationEntry[property] = Math.max(timing[property] - timing.navigationStart, 0);
    }
  }

  return navigationEntry;
}

module.exports = getNavigationTimingMetrics;
