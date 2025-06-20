/**
 * Factory function to handle paste and input events, including image pasting and terminal paste state.
 *
 * @param {Object} params - The parameters object.
 * @param {Function} params.onPaste - Callback invoked with pasted text content.
 * @param {Function} params.onInput - Callback invoked with input text and event.
 * @param {Function} params.onImagePaste - Callback invoked with base64 image data and media type when an image is pasted.
 * @returns {Object} An object containing wrappedOnInput handler, pasteState, and isPasting flag.
 */
function createPasteInputHandler({
  onPaste,
  onInput,
  onImagePaste
}) {
  // State for accumulating paste chunks and tracking timeout
  const [pasteState, setPasteState] = MW1.default.useState({
    chunks: [],
    timeoutId: null
  });
  // State for tracking if a paste operation is in progress
  const [isPasting, setIsPasting] = MW1.default.useState(false);

  /**
   * Handles scheduling the processing of accumulated paste chunks.
   * Clears any existing timeout and sets a new one to process after 100ms.
   * @param {number|null} existingTimeoutId - The current timeout updateSnapshotAndNotify, if any.
   * @returns {number} The new timeout updateSnapshotAndNotify.
   */
  const schedulePasteProcessing = (existingTimeoutId) => {
    if (existingTimeoutId) {
      clearTimeout(existingTimeoutId);
    }
    return setTimeout(() => {
      setPasteState(({ chunks }) => {
        const pastedContent = chunks.join("");
        // If an image paste is detected and handler exists
        if (onImagePaste && wp1(pastedContent)) {
          const imageData = getFileBase64WithMediaType(pastedContent);
          if (imageData) {
            // Call image paste handler asynchronously
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
        // Otherwise, handle as normal paste
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

  // Get stdin from external dependency (likely for terminal paste detection)
  const { stdin } = Ag();

  // Effect to listen for terminal paste events
  MW1.default.useEffect(() => {
    if (!stdin) return;
    /**
     * Handles data events from stdin to detect terminal paste start/end.
     * @param {Buffer|string} data - The data from stdin.
     */
    const handleStdinData = (data) => {
      const str = data.toString();
      // Terminal paste start sequence
      if (str.includes("\x1B[200~")) setIsPasting(true);
      // Terminal paste end sequence
      if (str.includes("\x1B[201~")) setIsPasting(false);
    };
    stdin.on("data", handleStdinData);
    // Cleanup on unmount
    return () => {
      stdin.off("data", handleStdinData);
      setIsPasting(false);
    };
  }, [stdin]);

  return {
    /**
     * Handles input events, batching paste chunks and invoking appropriate callbacks.
     * @param {string} inputValue - The input value.
     * @param {Event} event - The input event object.
     */
    wrappedOnInput: (inputValue, event) => {
      const isImagePaste = wp1(inputValue);
      // If paste is large, in progress, or is an image, batch isBlobOrFileLikeObject for processing
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
      onInput(inputValue, event);
      // If input is long, ensure paste state is reset
      if (inputValue.length > 10) setIsPasting(false);
    },
    pasteState,
    isPasting
  };
}

module.exports = createPasteInputHandler;
