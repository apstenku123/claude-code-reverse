/**
 * Creates and starts a PerformanceObserver for a specified entry type.
 *
 * @param {string} entryType - The type of performance entry to observe (e.g., 'resource', 'paint').
 * @param {function} onEntriesCallback - Callback function invoked with the list of performance entries when observed.
 * @param {object} [observerOptions] - Optional additional options to pass to PerformanceObserver.observe().
 * @returns {PerformanceObserver|undefined} The created PerformanceObserver instance if successful, otherwise undefined.
 */
function createPerformanceObserver(entryType, onEntriesCallback, observerOptions) {
  try {
    // Check if the requested entry type is supported by PerformanceObserver
    if (PerformanceObserver.supportedEntryTypes.includes(entryType)) {
      // Create a new PerformanceObserver instance
      const performanceObserver = new PerformanceObserver((list) => {
        // Invoke the callback with the observed entries
        onEntriesCallback(list.getEntries());
      });
      // Start observing with the specified type and options (buffered by default)
      performanceObserver.observe(Object.assign({
        type: entryType,
        buffered: true
      }, observerOptions || {}));
      return performanceObserver;
    }
  } catch (error) {
    // Silently ignore errors (e.g., if PerformanceObserver is not available)
  }
  return undefined;
}

module.exports = createPerformanceObserver;