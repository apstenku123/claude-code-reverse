/**
 * useSelectionChangeLogger
 *
 * React hook that listens for selection change notifications from a connected IDE entry and
 * invokes a callback with selection details whenever the selection changes. If the connection changes,
 * isBlobOrFileLikeObject resets the selection state. Handles both selection and text-only notifications.
 *
 * @param {any} connectionSource - The source (e.g., connection id or object) used to find the connected IDE entry.
 * @param {function} onSelectionChange - Callback invoked with selection details ({ lineCount, text, filePath })
 *   or reset object ({ lineCount: 0, text: undefined, filePath: undefined }) when the connection changes.
 * @returns {void}
 */
function useSelectionChangeLogger(connectionSource, onSelectionChange) {
  const hasSubscribedRef = EA1.useRef(false);
  const previousIdeEntryRef = EA1.useRef(null);

  EA1.useEffect(() => {
    // Find the currently connected IDE entry
    const connectedIdeEntry = findConnectedIdeEntry(connectionSource);

    // If the IDE entry has changed, reset subscription and selection state
    if (previousIdeEntryRef.current !== connectedIdeEntry) {
      hasSubscribedRef.current = false;
      previousIdeEntryRef.current = connectedIdeEntry || null;
      onSelectionChange({
        lineCount: 0,
        text: undefined,
        filePath: undefined
      });
    }

    // If already subscribed or no IDE entry, do nothing
    if (hasSubscribedRef.current || !connectedIdeEntry) return;

    /**
     * Handles selection change events and invokes the callback with selection details.
     * @param {object} selectionData - The selection data object
     */
    const handleSelectionChange = (selectionData) => {
      if (selectionData.selection?.start && selectionData.selection?.end) {
        const { start, end } = selectionData.selection;
        // Calculate the number of lines in the selection
        let lineCount = end.line - start.line + 1;
        // If the selection ends at the start of a line, exclude that line
        if (end.character === 0) lineCount--;
        const selectionInfo = {
          lineCount,
          text: selectionData.text,
          filePath: selectionData.filePath
        };
        onSelectionChange(selectionInfo);
      }
    };

    // Subscribe to selection change notifications from the IDE client
    connectedIdeEntry.client.setNotificationHandler(ow5, (notification) => {
      // Ignore notifications from stale connections
      if (previousIdeEntryRef.current !== connectedIdeEntry) return;
      try {
        const params = notification.params;
        if (params.selection && params.selection.start && params.selection.end) {
          handleSelectionChange(params);
        } else if (params.text !== undefined) {
          // Handle text-only notifications (no selection info)
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
    hasSubscribedRef.current = true;
  }, [connectionSource, onSelectionChange]);
}

module.exports = useSelectionChangeLogger;