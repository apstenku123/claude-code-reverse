/**
 * Periodically polls a time source and triggers a callback if a specified delay has passed since a base time.
 * Provides methods to reset the timer and enable/disable the callback trigger.
 *
 * @param {function} getTimeSource - Factory function returning an object with getTimeMs() and reset() methods.
 * @param {number} baseTimeMs - The base time in milliseconds to compare against.
 * @param {number} delayMs - The delay in milliseconds to wait after baseTimeMs before triggering the callback.
 * @param {function} onDelayReached - Callback function to invoke when the delay has been reached and enabled.
 * @returns {{ poll: function, enabled: function }} An object with methods to reset the timer and enable/disable the callback.
 */
function createDelayedInteractionPoller(getTimeSource, baseTimeMs, delayMs, onDelayReached) {
  const timeSource = getTimeSource();
  let hasTriggered = false; // Tracks if the callback has been triggered for the current interval
  let isEnabled = true;     // Controls whether the callback should be invoked

  // Poll every 20ms to check if the delay has been reached
  setInterval(() => {
    const currentTimeMs = timeSource.getTimeMs();

    // If the delay has passed and callback hasn'processRuleBeginHandlers been triggered yet
    if (!hasTriggered && currentTimeMs > baseTimeMs + delayMs) {
      hasTriggered = true;
      if (isEnabled) {
        onDelayReached();
      }
    }

    // If time goes back below the threshold, reset the trigger
    if (currentTimeMs < baseTimeMs + delayMs) {
      hasTriggered = false;
    }
  }, 20);

  return {
    /**
     * Resets the internal timer of the time source.
     */
    poll: () => {
      timeSource.reset();
    },
    /**
     * Enables or disables the callback trigger.
     * @param {boolean} enabled - Whether the callback should be triggered.
     */
    enabled: (enabled) => {
      isEnabled = enabled;
    }
  };
}

module.exports = createDelayedInteractionPoller;