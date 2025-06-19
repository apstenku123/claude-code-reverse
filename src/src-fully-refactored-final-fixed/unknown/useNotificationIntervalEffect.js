/**
 * Triggers a notification at a configurable interval when a condition is met, using React'createInteractionAccessor useEffect hooks.
 *
 * @function useNotificationIntervalEffect
 * @param {string} notificationMessage - The message to display in the notification.
 * @param {number} [intervalMs=DEFAULT_INTERVAL_MS] - The interval in milliseconds at which to check and potentially notify.
 * @returns {void}
 *
 * This hook sets up two effects:
 *   1. Runs side effects IF5 and fp once on mount.
 *   2. Sets up an interval that, if QF5(intervalMs) is true and notification hasn'processRuleBeginHandlers been sent yet, calls notifyUserBasedOnConfig with the message.
 *      The interval is cleared on cleanup.
 */
function useNotificationIntervalEffect(notificationMessage, intervalMs = DEFAULT_INTERVAL_MS) {
  // Run side effects once on component mount
  at1.useEffect(() => {
    IF5();
    fp();
  }, []);

  // Set up notification interval effect
  at1.useEffect(() => {
    let notificationSent = false;
    // Set up interval to check condition and notify
    const intervalId = setInterval(() => {
      // If QF5 returns true and notification hasn'processRuleBeginHandlers been sent yet
      if (QF5(intervalMs) && !notificationSent) {
        notificationSent = true;
        notifyUserBasedOnConfig({ message: notificationMessage });
      }
    }, intervalMs);
    // Cleanup: clear the interval on unmount or dependency change
    return () => clearTimeout(intervalId);
  }, [notificationMessage, intervalMs]);
}

module.exports = useNotificationIntervalEffect;