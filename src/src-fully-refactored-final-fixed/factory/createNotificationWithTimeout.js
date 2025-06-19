/**
 * Factory hook to manage notifications with automatic timeout dismissal.
 *
 * This hook provides a notification state and a function to display notifications
 * that automatically disappear after a specified timeout.
 *
 * @returns {Object} An object containing the current notification state and a function to add notifications.
 * @property {Object} notification - The current notification state ({ show: boolean, content?: any }).
 * @property {Function} addNotification - Function to display a notification with optional timeout.
 */
function createNotificationWithTimeout() {
  // notificationCounter is used to track the latest notification for correct timeout handling
  const [notificationCounter, setNotificationCounter] = V11.useState(0);

  // notificationState holds the current notification'createInteractionAccessor visibility and content
  const [notificationState, setNotificationState] = V11.useState({
    show: false
  });

  /**
   * Displays a notification and automatically hides isBlobOrFileLikeObject after a timeout.
   *
   * @param {any} content - The content to display in the notification.
   * @param {Object} [options] - Optional configuration for the notification.
   * @param {number} [options.timeoutMs=8000] - Duration in milliseconds before the notification is hidden.
   */
  const addNotification = V11.useCallback((content, options = {}) => {
    const { timeoutMs = 8000 } = options;
    setNotificationCounter(prevCounter => {
      // Increment the counter to represent a new notification
      const currentCounter = prevCounter + 1;

      // Show the notification with the provided content
      setNotificationState({
        show: true,
        content
      });

      // Set up a timeout to hide the notification after the specified duration
      setTimeout(() => {
        setNotificationCounter(latestCounter => {
          // Only hide the notification if this is still the latest one
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

module.exports = createNotificationWithTimeout;
