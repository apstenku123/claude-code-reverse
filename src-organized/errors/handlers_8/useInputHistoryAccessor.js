/**
 * Custom hook to manage input history navigation and processing in a command interface.
 * Handles up/down navigation, input processing, and history reset.
 *
 * @param {function} processInteractionEntries - Callback to process a single interaction entry (display, type, pastedContents).
 * @param {string} initialInput - The initial input string to seed the history.
 * @param {string} initialPastedContents - The initial pasted contents associated with the input.
 * @returns {object} Object containing history index, setter, navigation handlers, and reset function.
 */
function useInputHistoryAccessor(processInteractionEntries, initialInput, initialPastedContents) {
  // React state for current history index
  const [historyIndex, setHistoryIndex] = E1A.useState(0);
  // React state for the most recent input entry
  const [recentInputEntry, setRecentInputEntry] = E1A.useState(undefined);

  /**
   * Processes a display entry and invokes the interaction processor.
   * Determines the type based on display prefix.
   * @param {object} entry - The display entry object.
   */
  const handleEntryProcess = (entry) => {
    if (entry !== undefined) {
      // Determine entry type based on display prefix
      const entryType = entry.display.startsWith("!")
        ? "bash"
        : entry.display.startsWith("#")
        ? "memory"
        : "prompt";
      // Remove prefix if needed
      const displayValue = (entryType === "bash" || entryType === "memory")
        ? entry.display.slice(1)
        : entry.display;
      processInteractionEntries(displayValue, entryType, entry.pastedContents);
    }
  };

  /**
   * Handler for navigating up in the history (older entries).
   * If at the beginning, seeds with initial input if present.
   */
  function onHistoryUp() {
    const historyEntries = processDisplayItems(); // Get normalized history entries
    if (historyIndex < historyEntries.length) {
      // If at the very start and initial input is non-empty, seed the recent entry
      if (historyIndex === 0 && initialInput.trim() !== "") {
        setRecentInputEntry({
          display: initialInput,
          pastedContents: initialPastedContents
        });
      }
      const nextIndex = historyIndex + 1;
      setHistoryIndex(nextIndex);
      handleEntryProcess(historyEntries[historyIndex]);
    }
  }

  /**
   * Handler for navigating down in the history (newer entries).
   * If at the most recent entry, restores the recent input entry.
   * @returns {boolean} True if at the bottom of the history.
   */
  function onHistoryDown() {
    const historyEntries = processDisplayItems();
    if (historyIndex > 1) {
      const prevIndex = historyIndex - 1;
      setHistoryIndex(prevIndex);
      handleEntryProcess(historyEntries[prevIndex - 1]);
    } else if (historyIndex === 1) {
      setHistoryIndex(0);
      handleEntryProcess(recentInputEntry);
    }
    return historyIndex <= 0;
  }

  /**
   * Resets the history navigation state and clears the recent input entry.
   */
  function resetHistory() {
    setRecentInputEntry(undefined);
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

module.exports = useInputHistoryAccessor;