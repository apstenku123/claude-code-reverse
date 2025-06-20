/**
 * Starts a polling interval that monitors elapsed time from a time source and triggers a UI action after a specified delay.
 *
 * @param {Function} getTimeSource - Function that returns an object with getTimeMs() and reset() methods (e.g., a timer or stopwatch).
 * @param {number} startTimeMs - The base time in milliseconds to start measuring from.
 * @param {number} delayMs - The delay in milliseconds after which the UI action should be triggered.
 * @param {Function} triggerUiAction - Function to invoke when the delay has elapsed and polling is enabled.
 * @returns {Object} An object with methods to reset the timer and enable/disable the UI action trigger.
 */
function startDelayedUiActionPoller(getTimeSource, startTimeMs, delayMs, triggerUiAction) {
  const timeSource = getTimeSource();
  let hasTriggered = false; // Tracks if the UI action has been triggered for the current interval
  let isEnabled = true;     // Controls whether the UI action can be triggered

  // Poll every 20ms to check if the delay has elapsed
  setInterval(() => {
    const currentTimeMs = timeSource.getTimeMs();

    // If not yet triggered and the delay has elapsed, trigger the UI action
    if (!hasTriggered && currentTimeMs > startTimeMs + delayMs) {
      hasTriggered = true;
      if (isEnabled) {
        triggerUiAction();
      }
    }

    // If time goes back below the threshold (e.g., after reset), allow triggering again
    if (currentTimeMs < startTimeMs + delayMs) {
      hasTriggered = false;
    }
  }, 20);

  return {
    /**
     * Resets the underlying time source (e.g., after a new interaction).
     */
    poll: () => {
      timeSource.reset();
    },
    /**
     * Enables or disables the UI action trigger.
     * @param {boolean} enabled - Whether to enable (true) or disable (false) the trigger.
     */
    enabled: (enabled) => {
      isEnabled = enabled;
    }
  };
}

module.exports = startDelayedUiActionPoller;
