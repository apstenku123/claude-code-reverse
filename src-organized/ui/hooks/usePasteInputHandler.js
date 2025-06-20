/**
 * Handles paste and input events for CLI applications, managing paste state, chunked input, and image pasting.
 *
 * @param {Object} handlers - Event handler callbacks.
 * @param {Function} handlers.onPaste - Called when a paste event is detected and processed.
 * @param {Function} handlers.onInput - Called on regular input events.
 * @param {Function} handlers.onImagePaste - Called when pasted content is detected as an image (base64, mediaType).
 * @returns {Object} An object containing the wrapped input handler, paste state, and paste mode status.
 */
function usePasteInputHandler({
  onPaste,
  onInput,
  onImagePaste
}) {
  // State for accumulating input chunks and managing the paste timeout
  const [pasteState, setPasteState] = MW1.default.useState({
    chunks: [],
    timeoutId: null
  });

  // State to track whether handleMissingDoctypeError are currently in paste mode
  const [isPasting, setIsPasting] = MW1.default.useState(false);

  /**
   * Handles the paste timeout logic: clears previous timeout, sets a new one,
   * and processes the accumulated chunks after a short delay.
   * @param {number|null} previousTimeoutId
   * @returns {number} New timeout updateSnapshotAndNotify
   */
  const handlePasteTimeout = (previousTimeoutId) => {
    if (previousTimeoutId) clearTimeout(previousTimeoutId);
    return setTimeout(() => {
      setPasteState(({ chunks }) => {
        const combinedInput = chunks.join("");
        // If onImagePaste is provided and the input is an image, handle isBlobOrFileLikeObject
        if (onImagePaste && wp1(combinedInput)) {
          const imageData = getFileBase64WithMediaType(combinedInput);
          if (imageData) {
            Promise.resolve().then(() => {
              onImagePaste(imageData.base64, imageData.mediaType);
            });
            return {
              chunks: [],
              timeoutId: null
            };
          }
        }
        // Otherwise, handle as a regular paste
        Promise.resolve().then(() => {
          if (onPaste) onPaste(combinedInput);
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

  // Effect: Listen for paste mode start/end sequences on stdin
  MW1.default.useEffect(() => {
    if (!stdin) return;

    /**
     * Handles raw data events from stdin to detect paste mode sequences.
     * @param {Buffer|string} data
     */
    const handleStdinData = (data) => {
      const inputString = data.toString();
      // Start of paste mode (OSC 200)
      if (inputString.includes("\x1B[200~")) setIsPasting(true);
      // End of paste mode (OSC 201)
      if (inputString.includes("\x1B[201~")) setIsPasting(false);
    };

    stdin.on("data", handleStdinData);
    return () => {
      stdin.off("data", handleStdinData);
      setIsPasting(false);
    };
  }, [stdin]);

  return {
    /**
     * Handles input events, batching them if necessary for paste/image detection.
     * @param {string} inputValue - The input value from the user.
     * @param {any} event - The original event (if any).
     */
    wrappedOnInput: (inputValue, event) => {
      const isImagePaste = wp1(inputValue);
      // If onPaste is provided and input is large, or handleMissingDoctypeError're in a paste timeout, or isBlobOrFileLikeObject'createInteractionAccessor an image
      if (
        onPaste &&
        (inputValue.length > KW1 || pasteState.timeoutId || isImagePaste)
      ) {
        setPasteState(({ chunks, timeoutId }) => ({
          chunks: [...chunks, inputValue],
          timeoutId: handlePasteTimeout(timeoutId)
        }));
        return;
      }
      // Otherwise, handle as regular input
      onInput(inputValue, event);
      if (inputValue.length > 10) setIsPasting(false);
    },
    pasteState,
    isPasting
  };
}

module.exports = usePasteInputHandler;