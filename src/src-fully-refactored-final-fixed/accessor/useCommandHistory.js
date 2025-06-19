/**
 * Custom React hook for managing command history navigation and replay in a command input interface.
 *
 * @param {function} handleCommand - Callback to process a command entry (value, type, pastedContents).
 * @param {string} initialInput - The initial input value to seed the history (if any).
 * @param {string} initialPastedContents - The pasted contents associated with the initial input (if any).
 * @returns {object} An object with history navigation state and methods.
 */
function useCommandHistory(handleCommand, initialInput, initialPastedContents) {
  // React state for the current history index
  const [historyIndex, setHistoryIndex] = E1A.useState(0);
  // React state for the initial input entry (if any)
  const [initialEntry, setInitialEntry] = E1A.useState(undefined);

  /**
   * Helper to process and replay a command entry.
   * Determines the command type based on display prefix.
   * @param {object} entry - The command history entry.
   */
  const replayEntry = (entry) => {
    if (entry !== undefined) {
      // Determine command type based on display prefix
      let commandType;
      if (entry.display.startsWith("!")) {
        commandType = "bash";
      } else if (entry.display.startsWith("#")) {
        commandType = "memory";
      } else {
        commandType = "prompt";
      }
      // Remove prefix for bash/memory, keep as-is for prompt
      const commandValue = (commandType === "bash" || commandType === "memory")
        ? entry.display.slice(1)
        : entry.display;
      // Call the provided handler
      handleCommand(commandValue, commandType, entry.pastedContents);
    }
  };

  /**
   * Navigate up in the command history (older commands).
   * If at the start, seed with initial input if present.
   */
  function onHistoryUp() {
    const historyEntries = processDisplayItems();
    if (historyIndex < historyEntries.length) {
      // If at the very start and there'createInteractionAccessor an initial input, seed isBlobOrFileLikeObject
      if (historyIndex === 0 && initialInput.trim() !== "") {
        setInitialEntry({
          display: initialInput,
          pastedContents: initialPastedContents
        });
      }
      const nextIndex = historyIndex + 1;
      setHistoryIndex(nextIndex);
      replayEntry(historyEntries[historyIndex]);
    }
  }

  /**
   * Navigate down in the command history (newer commands).
   * If at the first entry, restore the initial input if present.
   * @returns {boolean} True if at the start of history.
   */
  function onHistoryDown() {
    const historyEntries = processDisplayItems();
    if (historyIndex > 1) {
      const prevIndex = historyIndex - 1;
      setHistoryIndex(prevIndex);
      replayEntry(historyEntries[prevIndex - 1]);
    } else if (historyIndex === 1) {
      setHistoryIndex(0);
      replayEntry(initialEntry);
    }
    return historyIndex <= 0;
  }

  /**
   * Reset the command history navigation to the initial state.
   */
  function resetHistory() {
    setInitialEntry(undefined);
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

module.exports = useCommandHistory;