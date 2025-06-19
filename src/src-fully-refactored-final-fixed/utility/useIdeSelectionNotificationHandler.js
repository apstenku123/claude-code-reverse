/**
 * React hook that manages IDE selection notifications for a given source observable.
 * It sets up a notification handler to listen for selection changes from a connected IDE client,
 * and invokes a callback with selection details when changes occur.
 *
 * @param {any} sourceObservable - The observable or identifier for the IDE connection source.
 * @param {function} onSelectionChange - Callback function to handle selection change events. Receives an object with lineCount, text, and filePath.
 */
function useIdeSelectionNotificationHandler(sourceObservable, onSelectionChange) {
  const hasSubscribed = EA1.useRef(false);
  const lastConnectedIdeEntry = EA1.useRef(null);

  EA1.useEffect(() => {
    // Find the currently connected IDE entry
    const connectedIdeEntry = findConnectedIdeEntry(sourceObservable);

    // If the IDE entry has changed, reset subscription and notify with empty selection
    if (lastConnectedIdeEntry.current !== connectedIdeEntry) {
      hasSubscribed.current = false;
      lastConnectedIdeEntry.current = connectedIdeEntry || null;
      onSelectionChange({
        lineCount: 0,
        text: undefined,
        filePath: undefined
      });
    }

    // If already subscribed or no connected IDE, do nothing further
    if (hasSubscribed.current || !connectedIdeEntry) {
      return;
    }

    /**
     * Handles a selection change event from the IDE.
     * @param {object} selectionData - The selection data from the IDE.
     */
    const handleSelectionChange = (selectionData) => {
      if (selectionData.selection?.start && selectionData.selection?.end) {
        const { start, end } = selectionData.selection;
        // Calculate the number of lines selected
        let lineCount = end.line - start.line + 1;
        // If selection ends at the start of a line, reduce line count by 1
        if (end.character === 0) {
          lineCount--;
        }
        const selectionInfo = {
          lineCount,
          text: selectionData.text,
          filePath: selectionData.filePath
        };
        onSelectionChange(selectionInfo);
      }
    };

    // Set up notification handler for selection changes from the IDE client
    connectedIdeEntry.client.setNotificationHandler(ow5, (notification) => {
      // Ignore notifications from stale IDE entries
      if (lastConnectedIdeEntry.current !== connectedIdeEntry) {
        return;
      }
      try {
        const params = notification.params;
        if (params.selection && params.selection.start && params.selection.end) {
          handleSelectionChange(params);
        } else if (params.text !== undefined) {
          // Fallback: handle text-only selection
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

    // Mark as subscribed to prevent duplicate handlers
    hasSubscribed.current = true;
  }, [sourceObservable, onSelectionChange]);
}

module.exports = useIdeSelectionNotificationHandler;