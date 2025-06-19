/**
 * useUserNotificationEffect
 *
 * Sets up React effects to handle user notifications and track user interaction times.
 * On mount, updates the last user interaction time and performs an initial check.
 * Sets up an interval to notify the user based on a configuration interval, using the preferred notification method.
 *
 * @param {string} notificationMessage - The message to notify the user with.
 * @param {number} [notificationInterval=initializeSyntaxHighlighting$2] - The interval (in ms) at which to check and notify the user. Defaults to initializeSyntaxHighlighting$2.
 * @returns {void}
 */
function useUserNotificationEffect(notificationMessage, notificationInterval = initializeSyntaxHighlighting$2) {
  // Effect to update last user interaction time and perform initial check on mount
  at1.useEffect(() => {
    IF5(); // Perform initial check (purpose depends on IF5 implementation)
    updateLastUserInteractionTime(); // Update the last user interaction timestamp
  }, []);

  // Effect to set up notification interval
  at1.useEffect(() => {
    let hasNotified = false;
    // Set up interval to check and notify user
    const intervalId = setInterval(() => {
      // If the notification condition is met and user hasn'processRuleBeginHandlers been notified yet
      if (QF5(notificationInterval) && !hasNotified) {
        hasNotified = true;
        notifyUserBasedOnConfig({
          message: notificationMessage
        });
      }
    }, notificationInterval);
    // Cleanup: clear the interval on unmount or dependency change
    return () => clearTimeout(intervalId);
  }, [notificationMessage, notificationInterval]);
}

module.exports = useUserNotificationEffect;