/**
 * Handles suspense events for a given component, logging and tracking their resolution status.
 *
 * @param {Object} fiberNode - The React fiber node representing the component instance.
 * @param {Promise} suspensePromise - The promise representing the suspenseful operation.
 * @param {string} eventId - An identifier for the event or operation.
 * @returns {void}
 */
function handleSuspenseEvent(fiberNode, suspensePromise, eventId) {
  // Check if either suspense event tracking or logging is enabled
  if (areArraysEqual || isLoggingEnabled) {
    // Determine if the promise is already tracked (resuspend) or new (suspend)
    const suspendType = suspensePromiseTracker.has(suspensePromise) ? "resuspend" : "suspend";
    // Get a unique id for the promise
    const promiseId = getPromiseId(suspensePromise);
    // Get the component'createInteractionAccessor display name or fallback to "Unknown"
    const componentName = getComponentName(fiberNode) || "Unknown";
    // Determine if this is a mount or update phase
    const renderPhase = fiberNode.alternate === null ? "mount" : "update";
    // Get the display name for the promise if available
    const promiseDisplayName = suspensePromise.displayName || "";
    // Will hold the event object if tracking is enabled
    let suspenseEvent = null;

    // If suspense event tracking is enabled, create and store the event object
    if (areArraysEqual) {
      suspenseEvent = {
        componentName: componentName,
        depth: 0,
        duration: 0,
        id: String(promiseId),
        phase: renderPhase,
        promiseName: promiseDisplayName,
        resolution: "unresolved",
        timestamp: getCurrentTimestamp(),
        type: "suspense",
        warning: null
      };
      if (suspenseEventTracker) {
        suspenseEventTracker.suspenseEvents.push(suspenseEvent);
      }
    }

    // If logging is enabled, log the initial suspense event
    if (isLoggingEnabled) {
      logEvent(
        `--suspense-${suspendType}-${promiseId}-${componentName}-${renderPhase}-${eventId}-${promiseDisplayName}`
      );
    }

    // Attach handlers to the suspense promise for resolution and rejection
    suspensePromise.then(
      function onResolved() {
        // Update event object if tracking
        if (suspenseEvent) {
          suspenseEvent.duration = getCurrentTimestamp() - suspenseEvent.timestamp;
          suspenseEvent.resolution = "resolved";
        }
        // Log resolution if enabled
        if (isLoggingEnabled) {
          logEvent(`--suspense-resolved-${promiseId}-${componentName}`);
        }
      },
      function onRejected() {
        // Update event object if tracking
        if (suspenseEvent) {
          suspenseEvent.duration = getCurrentTimestamp() - suspenseEvent.timestamp;
          suspenseEvent.resolution = "rejected";
        }
        // Log rejection if enabled
        if (isLoggingEnabled) {
          logEvent(`--suspense-rejected-${promiseId}-${componentName}`);
        }
      }
    );
  }
}

module.exports = handleSuspenseEvent;