/**
 * Custom React hook to manage timed notifications with auto-hide functionality.
 *
 * This hook provides a notification state and a function to trigger notifications that automatically disappear after a specified timeout.
 *
 * @returns {Object} An object containing the current notification state and a function to add a new notification.
 * @property {Object} notification - The current notification state ({ show: boolean, content?: any }).
 * @property {Function} addNotification - Function to trigger a notification. Accepts notification content and optional timeout.
 */
function useTimedNotification() {
  // Counter to uniquely identify each notification instance
  const [notificationCounter, setNotificationCounter] = V11.useState(0);

  // State to hold the current notification'createInteractionAccessor visibility and content
  const [notificationState, setNotificationState] = V11.useState({
    show: false
  });

  /**
   * Triggers a notification that will auto-hide after a timeout.
   *
   * @param {*} content - The content to display in the notification.
   * @param {Object} [options] - Optional configuration object.
   * @param {number} [options.timeoutMs=8000] - Duration in milliseconds before the notification auto-hides.
   */
  const addNotification = V11.useCallback((content, options = {}) => {
    const { timeoutMs = 8000 } = options;
    setNotificationCounter(previousCounter => {
      // Increment the counter to identify this notification instance
      const currentCounter = previousCounter + 1;

      // Show the notification with the provided content
      setNotificationState({
        show: true,
        content
      });

      // Set a timeout to hide the notification after the specified duration
      setTimeout(() => {
        setNotificationCounter(latestCounter => {
          // Only hide the notification if this is the latest notification instance
          if (currentCounter === latestCounter) {
            setNotificationState({ show: false });
          }
          return latestCounter;
        });
      }, timeoutMs);

      return currentCounter;
    });
  }, []);

  return {
    notification: notificationState,
    addNotification
  };
}

module.exports = useTimedNotification;