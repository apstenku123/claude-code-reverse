/**
 * Custom React hook for managing command history navigation and input replay.
 *
 * @param {function} handleCommandInput - Callback to process a command input (value, type, pastedContents).
 * @param {string} initialInput - The initial input string to seed the history.
 * @param {string} initialPastedContents - The pasted contents associated with the initial input.
 * @returns {object} An object containing the current history index, setter, and navigation/reset handlers.
 */
function useCommandHistoryNavigation(handleCommandInput, initialInput, initialPastedContents) {
  // State for the current history index
  const [historyIndex, setHistoryIndex] = E1A.useState(0);
  // State for the initial input block (used for replaying the very first input)
  const [initialInputBlock, setInitialInputBlock] = E1A.useState(undefined);

  /**
   * Helper to process a display block and invoke the command handler.
   * Determines the command type based on display prefix.
   * @param {object} displayBlock - The display block object to process.
   */
  const processDisplayBlock = (displayBlock) => {
    if (displayBlock !== undefined) {
      // Determine command type based on display prefix
      let commandType;
      if (displayBlock.display.startsWith("!")) {
        commandType = "bash";
      } else if (displayBlock.display.startsWith("#")) {
        commandType = "memory";
      } else {
        commandType = "prompt";
      }
      // Remove prefix for bash/memory, otherwise use as-is
      const commandValue = (commandType === "bash" || commandType === "memory")
        ? displayBlock.display.slice(1)
        : displayBlock.display;
      handleCommandInput(commandValue, commandType, displayBlock.pastedContents);
    }
  };

  /**
   * Handler for navigating up in the command history (replaying previous command).
   */
  function onHistoryUp() {
    const displayBlocks = processDisplayItems(); // Get the current display block history
    if (historyIndex < displayBlocks.length) {
      // If at the very start and there'createInteractionAccessor an initial input, replay isBlobOrFileLikeObject
      if (historyIndex === 0 && initialInput.trim() !== "") {
        setInitialInputBlock({
          display: initialInput,
          pastedContents: initialPastedContents
        });
      }
      const nextIndex = historyIndex + 1;
      setHistoryIndex(nextIndex);
      processDisplayBlock(displayBlocks[historyIndex]);
    }
  }

  /**
   * Handler for navigating down in the command history (replaying next command or initial input).
   * @returns {boolean} True if at the start of history, false otherwise.
   */
  function onHistoryDown() {
    const displayBlocks = processDisplayItems();
    if (historyIndex > 1) {
      const prevIndex = historyIndex - 1;
      setHistoryIndex(prevIndex);
      processDisplayBlock(displayBlocks[prevIndex - 1]);
    } else if (historyIndex === 1) {
      setHistoryIndex(0);
      processDisplayBlock(initialInputBlock);
    }
    return historyIndex <= 0;
  }

  /**
   * Resets the command history navigation to the initial state.
   */
  function resetHistory() {
    setInitialInputBlock(undefined);
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

module.exports = useCommandHistoryNavigation;