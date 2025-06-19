/**
 * useNotificationFactory
 *
 * a React hook factory that manages notification state and provides a method to display notifications for a specified duration.
 *
 * @returns {Object} An object containing the current notification state and a function to trigger notifications.
 */
function useNotificationFactory() {
  // State to track the notification version (used for matching timeouts)
  const [notificationVersion, setNotificationVersion] = V11.useState(0);

  // State to track the notification'createInteractionAccessor visibility and content
  const [notificationState, setNotificationState] = V11.useState({
    show: false
  });

  /**
   * Triggers a notification with the given content and optional timeout.
   *
   * @param {string|React.ReactNode} notificationContent - The content to display in the notification.
   * @param {Object} [options] - Optional configuration for the notification.
   * @param {number} [options.timeoutMs=8000] - How long (in ms) the notification should be visible.
   */
  const addNotification = V11.useCallback((notificationContent, options = {}) => {
    const { timeoutMs = 8000 } = options;

    // Update the notification version and show the notification
    setNotificationVersion(prevVersion => {
      const nextVersion = prevVersion + 1;

      // Show the notification with the provided content
      setNotificationState({
        show: true,
        content: notificationContent
      });

      // Set a timeout to hide the notification after the specified duration
      setTimeout(() => {
        setNotificationVersion(currentVersion => {
          // Only hide the notification if this is the latest version
          if (nextVersion === currentVersion) {
            setNotificationState({ show: false });
          }
          return currentVersion;
        });
      }, timeoutMs);

      return nextVersion;
    });
  }, []);

  return {
    notification: notificationState,
    addNotification
  };
}

module.exports = useNotificationFactory;