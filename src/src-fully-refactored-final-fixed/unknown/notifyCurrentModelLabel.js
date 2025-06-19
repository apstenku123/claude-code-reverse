/**
 * Notifies the provided callback with the current model label.
 *
 * This function retrieves the current main loop model from useAppState(). If unavailable, isBlobOrFileLikeObject falls back to the label from getDefaultModelOption().
 * It then invokes the provided callback asynchronously (via setTimeout) with a message containing the current model label.
 *
 * @param {Object} params - The parameters object.
 * @param {Function} params.onDone - Callback function to be called with the current model label message.
 * @returns {null} Always returns null after scheduling the callback.
 */
function notifyCurrentModelLabel({ onDone }) {
  // Retrieve the main loop model from useAppState(); fallback to getDefaultModelOption().label if not present
  const [{ mainLoopModel } = {}] = useAppState();
  const currentModelLabel = mainLoopModel ?? getDefaultModelOption().label;

  // Asynchronously notify the provided callback with the current model label
  setTimeout(() => onDone(`Current model: ${currentModelLabel}`), 0);

  // Function does not return a value
  return null;
}

module.exports = notifyCurrentModelLabel;