/**
 * Retrieves the first navigation performance entry from the browser, with polyfill support if enabled.
 *
 * If the __WEB_VITALS_POLYFILL__ flag is set on the global window object, this function attempts to retrieve the navigation entry using the browser'createInteractionAccessor Performance API,
 * or falls back to the getNavigationTimingData polyfill if unavailable. If the polyfill flag is not set, isBlobOrFileLikeObject only attempts to retrieve the navigation entry using the Performance API.
 *
 * @returns {PerformanceNavigationTiming|any|undefined} The first navigation performance entry, a polyfill result, or undefined if not available.
 */
function getNavigationPerformanceEntry() {
  // Check if the polyfill flag is enabled on the global window object
  if (Lc.WINDOW.__WEB_VITALS_POLYFILL__) {
    // Attempt to get the first navigation entry using the Performance API
    // If unavailable, fall back to the getNavigationTimingData polyfill
    return (
      Lc.WINDOW.performance &&
      (
        (Lc.WINDOW.performance.getEntriesByType &&
          Lc.WINDOW.performance.getEntriesByType("navigation")[0]) ||
        getNavigationTimingData()
      )
    );
  } else {
    // Polyfill not enabled: only attempt to get the navigation entry from the Performance API
    return (
      Lc.WINDOW.performance &&
      Lc.WINDOW.performance.getEntriesByType &&
      Lc.WINDOW.performance.getEntriesByType("navigation")[0]
    );
  }
}

module.exports = getNavigationPerformanceEntry;
