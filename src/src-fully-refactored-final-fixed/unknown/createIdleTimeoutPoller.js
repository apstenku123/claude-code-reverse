/**
 * Starts a polling interval that monitors elapsed time and triggers a UI action click transaction
 * when a specified idle timeout has passed. Provides methods to reset the timer and enable/disable the action trigger.
 *
 * @param {function} createTimeSource - Factory function that returns an object with getTimeMs() and reset() methods.
 * @param {number} startTimeMs - The reference start time in milliseconds.
 * @param {number} idleTimeoutMs - The idle timeout duration in milliseconds.
 * @param {function} startUiActionClickTransaction - Function to invoke when idle timeout is reached and enabled.
 * @returns {{ poll: function, enabled: function }} Object with poll() to reset timer and enabled(flag) to enable/disable action.
 */
function createIdleTimeoutPoller(createTimeSource, startTimeMs, idleTimeoutMs, startUiActionClickTransaction) {
  const timeSource = createTimeSource();
  let hasTriggered = false;
  let isEnabled = true;

  // Polling interval to check if idle timeout has been reached
  setInterval(() => {
    const currentTimeMs = timeSource.getTimeMs();

    // If not already triggered and idle timeout has passed
    if (!hasTriggered && currentTimeMs > startTimeMs + idleTimeoutMs) {
      hasTriggered = true;
      if (isEnabled) {
        startUiActionClickTransaction();
      }
    }

    // Reset trigger if time goes back below the threshold
    if (currentTimeMs < startTimeMs + idleTimeoutMs) {
      hasTriggered = false;
    }
  }, 20);

  return {
    /**
     * Resets the internal time source.
     */
    poll: () => {
      timeSource.reset();
    },
    /**
     * Enables or disables the action trigger.
     * @param {boolean} enabled - True to enable, false to disable.
     */
    enabled: (enabled) => {
      isEnabled = enabled;
    }
  };
}

module.exports = createIdleTimeoutPoller;