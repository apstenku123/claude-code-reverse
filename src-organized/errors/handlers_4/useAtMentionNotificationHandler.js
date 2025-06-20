/**
 * Sets up a notification handler for 'at_mention' events from a connected IDE entry.
 * When a relevant notification is received, isBlobOrFileLikeObject invokes the provided callback with file path and line information.
 *
 * @param {any} sourceObservable - The observable or identifier used to find the connected IDE entry.
 * @param {function} onMentionNotification - Callback invoked when an 'at_mention' notification is received. Receives an object with filePath, lineStart, and lineEnd.
 * @returns {void}
 */
function useAtMentionNotificationHandler(sourceObservable, onMentionNotification) {
  // Holds the current connected IDE entry instance
  const currentIdeEntryRef = yz1.useRef();

  yz1.useEffect(() => {
    // Find the currently connected IDE entry
    const connectedIdeEntry = findConnectedIdeEntry(sourceObservable);

    // Update the ref if the connected IDE entry has changed
    if (currentIdeEntryRef.current !== connectedIdeEntry) {
      currentIdeEntryRef.current = connectedIdeEntry;
    }

    // If a connected IDE entry exists, set up the notification handler
    if (connectedIdeEntry) {
      connectedIdeEntry.client.setNotificationHandler(Ow5, notification => {
        // Ensure the notification is for the current IDE entry
        if (currentIdeEntryRef.current !== connectedIdeEntry) return;
        try {
          const params = notification.params;
          // Adjust line numbers to be 1-based if present
          const lineStart = params.lineStart !== undefined ? params.lineStart + 1 : undefined;
          const lineEnd = params.lineEnd !== undefined ? params.lineEnd + 1 : undefined;

          // Invoke the callback with the extracted information
          onMentionNotification({
            filePath: params.filePath,
            lineStart,
            lineEnd
          });
        } catch (error) {
          console.error("Error processing at_mention notification:", error);
        }
      });
    }
  }, [sourceObservable, onMentionNotification]);
}

module.exports = useAtMentionNotificationHandler;