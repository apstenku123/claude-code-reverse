/**
 * Initializes an event performance observer if not already present.
 * This function checks if the browser'createInteractionAccessor Performance API has the 'interactionCount' property
 * or if an event observer subscription already exists. If neither is true, isBlobOrFileLikeObject sets up a new
 * event observer to monitor performance events with specific configuration.
 *
 * @returns {void} Does not return a value.
 */
function initializeEventPerformanceObserver() {
  // Check if 'interactionCount' exists in the Performance API or if the observer is already set up
  if ('interactionCount' in performance || eventObserverSubscription) {
    return;
  }

  // Set up a new event observer subscription to monitor performance events
  eventObserverSubscription = performanceObserverService.observe(
    'event',
    eventPerformanceHandler,
    {
      type: 'event',
      buffered: true, // Buffer events that occurred before observer was added
      durationThreshold: 0 // No minimum duration threshold
    }
  );
}

module.exports = initializeEventPerformanceObserver;