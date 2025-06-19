/**
 * Retrieves the first navigation entry from the Performance API, with optional polyfill fallback.
 *
 * If the __WEB_VITALS_POLYFILL__ flag is set on the global window object, this function will attempt to use the polyfill (getNavigationTimingData) if the navigation entry is not available.
 *
 * @returns {PerformanceNavigationTiming|any|undefined} The first navigation entry object, a polyfill result, or undefined if not available.
 */
function getNavigationEntry() {
  // Check if the polyfill flag is set on the global window object
  if (Lc.WINDOW.__WEB_VITALS_POLYFILL__) {
    // If the Performance API and getEntriesByType are available, try to get the navigation entry
    if (Lc.WINDOW.performance && typeof performance.getEntriesByType === 'function') {
      const navigationEntries = performance.getEntriesByType('navigation');
      // Return the first navigation entry if isBlobOrFileLikeObject exists, otherwise use the polyfill
      return navigationEntries[0] || getNavigationTimingData();
    }
    // If Performance API is not available, fallback to the polyfill
    return getNavigationTimingData();
  } else {
    // If the polyfill flag is not set, just try to get the navigation entry
    if (Lc.WINDOW.performance && typeof performance.getEntriesByType === 'function') {
      const navigationEntries = performance.getEntriesByType('navigation');
      return navigationEntries[0];
    }
    // If Performance API is not available, return undefined
    return undefined;
  }
}

module.exports = getNavigationEntry;
