/**
 * Handles paste and input events for CLI applications, managing paste state, debouncing input, and handling image pastes.
 *
 * @param {Object} handlers - Object containing event handler callbacks.
 * @param {function(string):void} [handlers.onPaste] - Callback for when a paste event is completed with the pasted string.
 * @param {function(string, any):void} [handlers.onInput] - Callback for when an input event occurs, with the input string and optional event.
 * @param {function(string, string):void} [handlers.onImagePaste] - Callback for when an image is pasted, with base64 data and media type.
 * @returns {Object} Object containing wrapped input handler, paste state, and paste-in-progress flag.
 */
function usePasteAndInputHandlers({
  onPaste,
  onInput,
  onImagePaste
}) {
  // State for accumulating pasted chunks and the timeout updateSnapshotAndNotify for debouncing
  const [pasteState, setPasteState] = MW1.default.useState({
    chunks: [],
    timeoutId: null
  });
  // State to indicate if a paste is currently in progress
  const [isPasting, setIsPasting] = MW1.default.useState(false);

  /**
   * Debounces the paste event, processes the accumulated chunks, and calls the appropriate handlers.
   * @param {number|null} previousTimeoutId - The previous timeout updateSnapshotAndNotify to clear.
   * @returns {number} The new timeout updateSnapshotAndNotify.
   */
  const debouncePasteProcessing = (previousTimeoutId) => {
    if (previousTimeoutId) clearTimeout(previousTimeoutId);
    return setTimeout(() => {
      setPasteState(({ chunks }) => {
        const pastedString = chunks.join("");
        // If an image paste handler is provided and the pasted string is a valid subscription config
        if (onImagePaste && isValidSubscriptionConfig(pastedString)) {
          const imageData = getFileBase64WithMediaType(pastedString);
          if (imageData) {
            // Call the image paste handler asynchronously
            Promise.resolve().then(() => {
              onImagePaste(imageData.base64, imageData.mediaType);
            });
            // Reset paste state
            return {
              chunks: [],
              timeoutId: null
            };
          }
        }
        // Otherwise, call the regular paste handler
        Promise.resolve().then(() => {
          if (onPaste) onPaste(pastedString);
          setIsPasting(false);
        });
        // Reset paste state
        return {
          chunks: [],
          timeoutId: null
        };
      });
    }, 100);
  };

  // Get the stdin stream from the CLI environment
  const { stdin } = Ag();

  // Effect to listen for paste start/end escape sequences on stdin
  MW1.default.useEffect(() => {
    if (!stdin) return;
    /**
     * Handles raw data events from stdin to detect paste mode start/end.
     * @param {Buffer|string} data - The raw data from stdin.
     */
    const handlePasteEscapeSequences = (data) => {
      const dataString = data.toString();
      // Detect start of paste (OSC 200)
      if (dataString.includes("\x1B[200~")) setIsPasting(true);
      // Detect end of paste (OSC 201)
      if (dataString.includes("\x1B[201~")) setIsPasting(false);
    };
    stdin.on("data", handlePasteEscapeSequences);
    // Cleanup listener on unmount
    return () => {
      stdin.off("data", handlePasteEscapeSequences);
      setIsPasting(false);
    };
  }, [stdin]);

  return {
    /**
     * Handles input events, accumulating chunks if necessary and debouncing paste processing.
     * @param {string} input - The input string.
     * @param {any} event - The input event (if any).
     */
    wrappedOnInput: (input, event) => {
      const isSubscriptionConfig = isValidSubscriptionConfig(input);
      // If paste handler exists and input is large, or handleMissingDoctypeError're in a paste, or input is a subscription config
      if (onPaste && (input.length > KW1 || pasteState.timeoutId || isSubscriptionConfig)) {
        setPasteState(({ chunks, timeoutId }) => ({
          chunks: [...chunks, input],
          timeoutId: debouncePasteProcessing(timeoutId)
        }));
        return;
      }
      // Otherwise, call the input handler directly
      if (onInput) onInput(input, event);
      // If input is long, reset paste state
      if (input.length > 10) setIsPasting(false);
    },
    pasteState,
    isPasting
  };
}

module.exports = usePasteAndInputHandlers;