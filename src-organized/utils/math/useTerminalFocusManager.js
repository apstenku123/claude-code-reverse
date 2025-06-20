/**
 * Manages terminal focus state and input filtering for CLI applications.
 * Sets up terminal event listeners to track focus, and provides a filter for focus-related input sequences.
 *
 * @returns {Object} An object containing:
 *   - isFocused: boolean indicating if the terminal is focused
 *   - filterFocusSequences: function to filter out terminal focus-related input sequences
 */
function useTerminalFocusManager() {
  // State: isTerminalFocused tracks terminal focus, isFocusLost tracks if focus was lost
  const [isTerminalFocused, setIsTerminalFocused] = jN.useState(Rp1);
  const [isFocusLost, setIsFocusLost] = jN.useState(false);

  /**
   * Handles terminal focus changes.
   * @param {boolean} focused - Whether the terminal is focused
   */
  const handleFocusChange = jN.useCallback((focused) => {
    setIsTerminalFocused(focused);
    setIsFocusLost(false);
  }, []);

  // Effect: Set up terminal event listeners for focus tracking
  jN.useEffect(() => {
    // Only proceed if running in an interactive terminal
    if (!process.stdout.isTTY) return;

    // Add this focus handler to the global set
    Qj.add(handleFocusChange);

    // If this is the first handler, enable focus tracking and listen for input
    if (Qj.size === 1) {
      process.stdout.write("\x1B[?1004h"); // Enable focus tracking
      process.stdin.on("data", Op1);       // Listen for terminal data
    }

    // Cleanup: remove handler and disable tracking if none remain
    return () => {
      Qj.delete(handleFocusChange);
      if (Qj.size === 0) {
        process.stdin.off("data", Op1);
        process.stdout.write("\x1B[?1004l"); // Disable focus tracking
      }
    };
  }, [handleFocusChange]);

  // Effect: Track when typing occurs without terminal focus
  jN.useEffect(() => {
    if (!isTerminalFocused && isFocusLost) {
      logTelemetryEventIfEnabled("tengu_typing_without_terminal_focus", {});
    }
  }, [isTerminalFocused, isFocusLost]);

  /**
   * Filters out terminal focus-related input sequences.
   * If input is a focus sequence, returns an empty string.
   * If input is received while terminal is not focused, sets focus lost state.
   * @param {string} input - The input data
   * @param {any} extra - Additional data (optional)
   * @returns {string} The filtered input
   */
  const filterFocusSequences = jN.useCallback((input, extra) => {
    // Ignore terminal focus in/out sequences
    if (
      input === "\x1B[createObjectTracker" ||
      input === "\x1B[createDebouncedFunction" ||
      input === "[createObjectTracker" ||
      input === "[createDebouncedFunction"
    ) {
      return "";
    }
    // If input is received and terminal is not focused, mark focus lost
    if ((input || extra) && !isTerminalFocused) {
      setIsFocusLost(true);
    }
    return input;
  }, [isTerminalFocused]);

  return {
    isFocused: isTerminalFocused || isFocusLost,
    filterFocusSequences
  };
}

module.exports = useTerminalFocusManager;