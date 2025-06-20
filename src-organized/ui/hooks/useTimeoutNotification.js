/**
 * useTimeoutNotification
 *
 * a React hook that manages a notification state with automatic timeout dismissal.
 * Provides a method to show a notification for a specified duration.
 *
 * @returns {Object} An object containing the current notification state and a function to trigger notifications.
 * @property {Object} notification - The current notification state ({ show: boolean, content?: any })
 * @property {Function} addNotification - Function to show a notification with optional timeout duration
 */
function useTimeoutNotification() {
  // Counter to track notification instances
  const [notificationCounter, setNotificationCounter] = V11.useState(0);

  // Notification state: { show: boolean, content?: any }
  const [notification, setNotification] = V11.useState({ show: false });

  /**
   * Shows a notification for a specified duration.
   *
   * @param {any} content - The content to display in the notification.
   * @param {Object} [options] - Optional configuration.
   * @param {number} [options.timeoutMs=8000] - Duration in milliseconds before the notification is dismissed.
   */
  const addNotification = V11.useCallback((content, options = {}) => {
    const { timeoutMs = 8000 } = options;
    setNotificationCounter(prevCounter => {
      // Increment the counter to uniquely identify this notification
      const currentCounter = prevCounter + 1;
      // Show the notification with the provided content
      setNotification({
        show: true,
        content
      });
      // Set a timeout to hide the notification after the specified duration
      setTimeout(() => {
        setNotificationCounter(latestCounter => {
          // Only hide the notification if this is the latest one
          if (currentCounter === latestCounter) {
            setNotification({ show: false });
          }
          return latestCounter;
        });
      }, timeoutMs);
      return currentCounter;
    });
  }, []);

  return {
    notification,
    addNotification
  };
}

module.exports = useTimeoutNotification;