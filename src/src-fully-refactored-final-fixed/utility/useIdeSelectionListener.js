/**
 * useIdeSelectionListener
 *
 * React hook that listens for selection changes from a connected IDE entry and notifies the provided callback with selection details.
 *
 * @param {any} ideSource - The source object used to find the connected IDE entry (typically a dependency or observable).
 * @param {function} onSelectionChange - Callback function to be called with selection details ({ lineCount, text, filePath }) when the selection changes.
 * @returns {void}
 */
function useIdeSelectionListener(ideSource, onSelectionChange) {
  const hasSubscribed = EA1.useRef(false);
  const lastConnectedIdeEntry = EA1.useRef(null);

  EA1.useEffect(() => {
    // Find the currently connected IDE entry
    const connectedIdeEntry = findConnectedIdeEntry(ideSource);

    // If the connected IDE entry has changed, reset subscription and notify with empty selection
    if (lastConnectedIdeEntry.current !== connectedIdeEntry) {
      hasSubscribed.current = false;
      lastConnectedIdeEntry.current = connectedIdeEntry || null;
      onSelectionChange({
        lineCount: 0,
        text: undefined,
        filePath: undefined
      });
    }

    // If already subscribed or no connected IDE entry, do nothing
    if (hasSubscribed.current || !connectedIdeEntry) return;

    /**
     * Handles selection change data and invokes the callback with processed selection info.
     * @param {object} selectionData - The selection data object.
     */
    const handleSelectionChange = (selectionData) => {
      if (selectionData.selection?.start && selectionData.selection?.end) {
        const { start: selectionStart, end: selectionEnd } = selectionData.selection;
        let lineCount = selectionEnd.line - selectionStart.line + 1;
        // If the selection ends at the start of a line, decrement the line count
        if (selectionEnd.character === 0) lineCount--;
        const selectionInfo = {
          lineCount,
          text: selectionData.text,
          filePath: selectionData.filePath
        };
        onSelectionChange(selectionInfo);
      }
    };

    // Register a notification handler for selection changes from the IDE client
    connectedIdeEntry.client.setNotificationHandler(ow5, (notification) => {
      // Ensure the notification is for the current connected IDE entry
      if (lastConnectedIdeEntry.current !== connectedIdeEntry) return;
      try {
        const params = notification.params;
        if (params.selection && params.selection.start && params.selection.end) {
          handleSelectionChange(params);
        } else if (params.text !== undefined) {
          // Fallback: handle case where only text is provided
          handleSelectionChange({
            selection: null,
            text: params.text,
            filePath: params.filePath
          });
        }
      } catch (error) {
        console.error("Error processing selection_changed notification:", error);
      }
    });
    hasSubscribed.current = true;
  }, [ideSource, onSelectionChange]);
}

module.exports = useIdeSelectionListener;