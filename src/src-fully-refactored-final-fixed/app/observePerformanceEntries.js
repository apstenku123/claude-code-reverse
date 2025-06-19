/**
 * Observes browser performance entry types and invokes a callback with the collected entries.
 *
 * @param {string} entryType - The type of performance entry to observe (e.g., 'resource', 'paint').
 * @param {function} onEntriesCallback - Callback function invoked with the list of performance entries.
 * @param {object} [observerOptions] - Optional additional options for PerformanceObserver.observe().
 * @returns {PerformanceObserver|undefined} The created PerformanceObserver instance, or undefined if not supported or an error occurs.
 */
function observePerformanceEntries(entryType, onEntriesCallback, observerOptions) {
  try {
    // Check if the requested entry type is supported by the browser
    if (PerformanceObserver.supportedEntryTypes.includes(entryType)) {
      // Create a new PerformanceObserver instance
      const performanceObserver = new PerformanceObserver((performanceObserverList) => {
        // Invoke the callback with the collected performance entries
        onEntriesCallback(performanceObserverList.getEntries());
      });
      // Observe the specified entry type with buffering enabled and any additional options
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

module.exports = observePerformanceEntries;
