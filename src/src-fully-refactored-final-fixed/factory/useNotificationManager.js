/**
 * useNotificationManager
 *
 * React custom hook for managing notification state and displaying notifications with auto-dismiss functionality.
 *
 * @returns {Object} An object containing the current notification state and a function to trigger a new notification.
 *   - notification: { show: boolean, content?: any }
 *   - addNotification: (content: any, options?: { timeoutMs?: number }) => void
 */
function useNotificationManager() {
  // notificationCount is used to uniquely identify each notification instance
  const [notificationCount, setNotificationCount] = V11.useState(0);

  // notificationState holds the current notification'createInteractionAccessor visibility and content
  const [notificationState, setNotificationState] = V11.useState({
    show: false
  });

  /**
   * Triggers a new notification to be shown for a specified duration.
   *
   * @param {any} content - The content to display in the notification.
   * @param {Object} [options] - Optional configuration object.
   * @param {number} [options.timeoutMs=8000] - Duration in milliseconds before the notification auto-dismisses.
   */
  const addNotification = V11.useCallback((content, options = {}) => {
    const { timeoutMs = 8000 } = options;
    setNotificationCount(previousCount => {
      const currentCount = previousCount + 1;
      // Show the notification with the provided content
      setNotificationState({
        show: true,
        content
      });
      // Set a timeout to hide the notification after the specified duration
      setTimeout(() => {
        setNotificationCount(latestCount => {
          // Only hide the notification if this is the most recent one
          if (currentCount === latestCount) {
            setNotificationState({ show: false });
          }
          return latestCount;
        });
      }, timeoutMs);
      return currentCount;
    });
  }, []);

  return {
    notification: notificationState,
    addNotification
  };
}

module.exports = useNotificationManager;