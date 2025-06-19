/**
 * Custom React hook for navigating and managing a command input history.
 *
 * @param {function} handleCommand - Callback to process a command entry. Receives (commandValue, commandType, pastedContents).
 * @param {string} initialInput - The initial input value to seed the history.
 * @param {string} initialPastedContents - The initial pasted contents associated with the input.
 * @returns {object} An object containing the current history index, setter, and navigation/reset handlers.
 */
function useCommandHistoryNavigator(handleCommand, initialInput, initialPastedContents) {
  // React state for the current history index
  const [historyIndex, setHistoryIndex] = E1A.useState(0);
  // React state for the initial input entry (if any)
  const [initialHistoryEntry, setInitialHistoryEntry] = E1A.useState(undefined);

  /**
   * Helper to process a command entry and invoke the handler.
   * Determines the command type based on display string prefix.
   * @param {object} entry - The command history entry.
   */
  const processHistoryEntry = (entry) => {
    if (entry !== undefined) {
      // Determine command type based on display prefix
      let commandType = entry.display.startsWith('!')
        ? 'bash'
        : entry.display.startsWith('#')
        ? 'memory'
        : 'prompt';
      // Remove prefix for bash/memory, keep as is for prompt
      let commandValue = (commandType === 'bash' || commandType === 'memory')
        ? entry.display.slice(1)
        : entry.display;
      handleCommand(commandValue, commandType, entry.pastedContents);
    }
  };

  /**
   * Handler for navigating up in the command history (older entries).
   * If at the start, seeds the history with the initial input if present.
   */
  function onHistoryUp() {
    const historyEntries = processDisplayItems(); // Get the full history array
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
      processHistoryEntry(historyEntries[historyIndex]);
    }
  }

  /**
   * Handler for navigating down in the command history (newer entries).
   * If at the first entry, returns to the initial input if present.
   * @returns {boolean} True if at the start of history, false otherwise.
   */
  function onHistoryDown() {
    const historyEntries = processDisplayItems();
    if (historyIndex > 1) {
      const prevIndex = historyIndex - 1;
      setHistoryIndex(prevIndex);
      processHistoryEntry(historyEntries[prevIndex - 1]);
    } else if (historyIndex === 1) {
      // Return to the initial input
      setHistoryIndex(0);
      processHistoryEntry(initialHistoryEntry);
    }
    return historyIndex <= 0;
  }

  /**
   * Resets the command history navigation to the initial state.
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

module.exports = useCommandHistoryNavigator;