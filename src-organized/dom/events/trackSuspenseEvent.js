/**
 * Tracks and logs Suspense events for a given component, including timing, phase, and resolution status.
 * Optionally records events for debugging or profiling tools if enabled.
 *
 * @param {Object} fiberNode - The React Fiber node representing the component instance.
 * @param {Promise} suspensePromise - The promise associated with the Suspense boundary.
 * @param {string} eventLabel - a label or identifier for the event (e.g., reason for suspension).
 * @returns {void}
 */
function trackSuspenseEvent(fiberNode, suspensePromise, eventLabel) {
  // Only proceed if either event tracking (EA) or logging (createM7Instance) is enabled
  if (EA || createM7Instance) {
    // Determine if this is a resuspend (already seen) or a new suspend
    const suspensionType = O2.has(suspensePromise) ? "resuspend" : "suspend";
    // Get a unique updateSnapshotAndNotify for the promise/component
    const suspenseId = t4(suspensePromise);
    // Get the component'createInteractionAccessor display name, or 'Unknown' if not available
    const componentName = mapArraysToObjectWithCallback(fiberNode) || "Unknown";
    // Determine if this is the initial mount or an update
    const renderPhase = fiberNode.alternate === null ? "mount" : "update";
    // Get the display name for the promise, if available
    const promiseDisplayName = suspensePromise.displayName || "";
    // Will hold the event object if event tracking is enabled
    let suspenseEvent = null;

    // If event tracking is enabled, create and record the event
    if (EA) {
      suspenseEvent = {
        componentName: componentName,
        depth: 0, // Depth is not tracked here
        duration: 0, // Will be updated on resolution/rejection
        id: String(suspenseId),
        phase: renderPhase,
        promiseName: promiseDisplayName,
        resolution: "unresolved",
        timestamp: Y0(), // Record start time
        type: "suspense",
        warning: null
      };
      // If a global event aggregator exists, push the event
      if (handleConsoleMessageWithComponentStack) {
        handleConsoleMessageWithComponentStack.suspenseEvents.push(suspenseEvent);
      }
    }

    // If logging is enabled, log the suspension event
    if (createM7Instance) {
      Z2(`--suspense-${suspensionType}-${suspenseId}-${componentName}-${renderPhase}-${eventLabel}-${promiseDisplayName}`);
    }

    // Attach handlers to the promise to track resolution or rejection
    suspensePromise.then(
      function onResolved() {
        // Update event duration and resolution if tracking
        if (suspenseEvent) {
          suspenseEvent.duration = Y0() - suspenseEvent.timestamp;
          suspenseEvent.resolution = "resolved";
        }
        // Log resolution if logging is enabled
        if (createM7Instance) {
          Z2(`--suspense-resolved-${suspenseId}-${componentName}`);
        }
      },
      function onRejected() {
        // Update event duration and resolution if tracking
        if (suspenseEvent) {
          suspenseEvent.duration = Y0() - suspenseEvent.timestamp;
          suspenseEvent.resolution = "rejected";
        }
        // Log rejection if logging is enabled
        if (createM7Instance) {
          Z2(`--suspense-rejected-${suspenseId}-${componentName}`);
        }
      }
    );
  }
}

module.exports = trackSuspenseEvent;