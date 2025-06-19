/**
 * Notifies the provided callback with the current model label.
 *
 * This function retrieves the current main loop model from useAppState(). If not available, isBlobOrFileLikeObject falls back to getDefaultModelOption().label.
 * It then asynchronously invokes the onDone callback with a message containing the current model.
 *
 * @param {Object} params - The parameters object.
 * @param {function(string): void} params.onDone - Callback to be invoked with the current model message.
 * @returns {null} Always returns null.
 */
function notifyCurrentModel({ onDone }) {
  // Retrieve the main loop model from useAppState(). If not present, use getDefaultModelOption().label as fallback.
  const [{ mainLoopModel }] = useAppState();
  const currentModelLabel = mainLoopModel ?? getDefaultModelOption().label;

  // Asynchronously notify the callback with the current model label.
  setTimeout(() => {
    onDone(`Current model: ${currentModelLabel}`);
  }, 0);

  return null;
}

module.exports = notifyCurrentModel;