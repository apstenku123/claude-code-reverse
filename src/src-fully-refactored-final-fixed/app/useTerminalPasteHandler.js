/**
 * Handles paste and input events in a terminal-like CLI environment, managing paste state, chunked input, and image pastes.
 *
 * @param {Object} params - The handler functions for paste and input events.
 * @param {function(string):void} [params.onPaste] - Callback for handling plain text paste events.
 * @param {function(string, any):void} [params.onInput] - Callback for handling input events (e.g., keypresses or input changes).
 * @param {function(string, string):void} [params.onImagePaste] - Callback for handling image paste events (receives base64 and media type).
 * @returns {Object} An object containing wrapped input handler, paste state, and pasting status.
 */
function useTerminalPasteHandler({
  onPaste,
  onInput,
  onImagePaste
}) {
  // State for managing pasted chunks and timeout
  const [pasteState, setPasteState] = MW1.default.useState({
    chunks: [],
    timeoutId: null
  });

  // State for tracking whether a paste operation is in progress
  const [isPasting, setIsPasting] = MW1.default.useState(false);

  /**
   * Schedules processing of the current paste chunks after a short delay.
   * Clears any previous timeout.
   * @param {number|null} previousTimeoutId
   * @returns {number} New timeout updateSnapshotAndNotify
   */
  const schedulePasteProcessing = (previousTimeoutId) => {
    if (previousTimeoutId) clearTimeout(previousTimeoutId);
    return setTimeout(() => {
      setPasteState(({ chunks }) => {
        const pastedContent = chunks.join("");
        // If image paste handler is provided and content is an image
        if (onImagePaste && wp1(pastedContent)) {
          const imageData = getFileBase64WithMediaType(pastedContent);
          if (imageData) {
            // Handle image paste asynchronously
            Promise.resolve().then(() => {
              onImagePaste(imageData.base64, imageData.mediaType);
            });
            return {
              chunks: [],
              timeoutId: null
            };
          }
        }
        // Handle plain text paste
        Promise.resolve().then(() => {
          if (onPaste) onPaste(pastedContent);
          setIsPasting(false);
        });
        return {
          chunks: [],
          timeoutId: null
        };
      });
    }, 100);
  };

  // Get stdin from external dependency
  const { stdin } = Ag();

  // Effect: Listen for terminal paste start/end sequences
  MW1.default.useEffect(() => {
    if (!stdin) return;
    /**
     * Handles raw data from stdin to detect paste start/end sequences.
     * @param {Buffer|string} data
     */
    const handleStdinData = (data) => {
      const dataStr = data.toString();
      // Detect start of bracketed paste
      if (dataStr.includes("\x1B[200~")) setIsPasting(true);
      // Detect end of bracketed paste
      if (dataStr.includes("\x1B[201~")) setIsPasting(false);
    };
    stdin.on("data", handleStdinData);
    return () => {
      stdin.off("data", handleStdinData);
      setIsPasting(false);
    };
  }, [stdin]);

  return {
    /**
     * Handles input events, chunking input if necessary and scheduling paste processing.
     * @param {string} inputValue - The input value from the terminal.
     * @param {any} event - The associated event object (if any).
     */
    wrappedOnInput: (inputValue, event) => {
      const isImagePaste = wp1(inputValue);
      // If onPaste handler exists, input is large, or an image paste is detected, or a paste is in progress
      if (
        onPaste &&
        (inputValue.length > KW1 || pasteState.timeoutId || isImagePaste)
      ) {
        setPasteState(({ chunks, timeoutId }) => ({
          chunks: [...chunks, inputValue],
          timeoutId: schedulePasteProcessing(timeoutId)
        }));
        return;
      }
      // Otherwise, handle as normal input
      if (onInput) onInput(inputValue, event);
      // If input is long, reset pasting state
      if (inputValue.length > 10) setIsPasting(false);
    },
    pasteState,
    isPasting
  };
}

module.exports = useTerminalPasteHandler;