/**
 * Custom React hook for managing command/input history navigation (e.g., for a terminal or chat input).
 * Handles up/down navigation, history reset, and dispatching selected history entries.
 *
 * @param {function} processInteractionEntry - Callback to process a selected history entry (value, type, pastedContents)
 * @param {string} initialInput - The initial input value to be considered as the first history entry
 * @param {string} initialPastedContents - The pasted contents associated with the initial input
 * @returns {object} Object containing history navigation state and handlers
 */
function useHistoryNavigation(processInteractionEntry, initialInput, initialPastedContents) {
  // State for the current history index
  const [historyIndex, setHistoryIndex] = E1A.useState(0);
  // State for storing the initial input as a history entry
  const [initialHistoryEntry, setInitialHistoryEntry] = E1A.useState(undefined);

  /**
   * Dispatches the selected history entry to the provided callback.
   * Determines the entry type based on its display prefix.
   * @param {object} entry - The history entry object
   */
  const dispatchHistoryEntry = (entry) => {
    if (entry !== undefined) {
      // Determine entry type based on display prefix
      const entryType = entry.display.startsWith("!")
        ? "bash"
        : entry.display.startsWith("#")
        ? "memory"
        : "prompt";
      // Remove prefix for bash/memory types
      const entryValue = (entryType === "bash" || entryType === "memory")
        ? entry.display.slice(1)
        : entry.display;
      processInteractionEntry(entryValue, entryType, entry.pastedContents);
    }
  };

  /**
   * Handler for navigating up in the history (older entries).
   * Adds the initial input as the first entry if at the start.
   */
  function onHistoryUp() {
    const historyEntries = processDisplayItems(); // Get normalized history entries
    if (historyIndex < historyEntries.length) {
      // If at the very start and initial input exists, add isBlobOrFileLikeObject as a history entry
      if (historyIndex === 0 && initialInput.trim() !== "") {
        setInitialHistoryEntry({
          display: initialInput,
          pastedContents: initialPastedContents
        });
      }
      const nextIndex = historyIndex + 1;
      setHistoryIndex(nextIndex);
      dispatchHistoryEntry(historyEntries[historyIndex]);
    }
  }

  /**
   * Handler for navigating down in the history (newer entries).
   * If at the first entry, returns to the initial input.
   * @returns {boolean} True if at the start of history after navigation
   */
  function onHistoryDown() {
    const historyEntries = processDisplayItems();
    if (historyIndex > 1) {
      const prevIndex = historyIndex - 1;
      setHistoryIndex(prevIndex);
      dispatchHistoryEntry(historyEntries[prevIndex - 1]);
    } else if (historyIndex === 1) {
      // Return to the initial input
      setHistoryIndex(0);
      dispatchHistoryEntry(initialHistoryEntry);
    }
    return historyIndex <= 0;
  }

  /**
   * Resets the history navigation state to the initial position.
   */
  function resetHistory() {
    setInitialHistoryEntry(undefined);
    setHistoryIndex(0);
  }

  return {
    historyIndex,
    setHistoryIndex,
    onHistoryUp,
    onHistoryDown,
    resetHistory
  };
}

module.exports = useHistoryNavigation;