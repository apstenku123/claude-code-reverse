/**
 * Creates a throttled handler function for user interactions, ensuring that a given action is not triggered more than once within a specified time window.
 *
 * @param {Function} processInteractionEntries - Callback to process interaction entries and manage UI state (e.g., show/hide loading indicator).
 * @param {Function} onRapidInteraction - Callback to execute when interactions occur too rapidly (e.g., cleanup or cancel action).
 * @param {Function} onIdleInteraction - Optional callback to execute when interaction is considered idle (i.e., not too rapid).
 * @returns {Function} Throttled handler function to be used as an event callback.
 */
function createThrottledInteractionHandler(processInteractionEntries, onRapidInteraction, onIdleInteraction) {
  // Reference to the timestamp of the last interaction
  const lastInteractionTimestampRef = sx1.useRef(0);
  // Reference to the timeout updateSnapshotAndNotify for resetting the UI state
  const resetTimeoutRef = sx1.useRef();

  /**
   * Handler function that enforces throttling logic on user interactions.
   */
  return () => {
    const now = Date.now();
    // If the last interaction was within the throttle window and a timeout is pending
    if (now - lastInteractionTimestampRef.current <= BZ0 && resetTimeoutRef.current) {
      // Clear the pending timeout and reset the reference
      clearTimeout(resetTimeoutRef.current);
      resetTimeoutRef.current = undefined;
      // Execute the rapid interaction callback (e.g., cleanup)
      onRapidInteraction();
      // Hide the UI indicator or perform necessary UI update
      processInteractionEntries(false);
    } else {
      // If enough time has passed, optionally execute the idle callback
      if (onIdleInteraction) {
        onIdleInteraction();
      }
      // Show the UI indicator or perform necessary UI update
      processInteractionEntries(true);
      // Set a timeout to reset the UI state after the throttle window
      resetTimeoutRef.current = setTimeout(() => processInteractionEntries(false), BZ0);
    }
    // Update the timestamp of the last interaction
    lastInteractionTimestampRef.current = now;
  };
}

module.exports = createThrottledInteractionHandler;