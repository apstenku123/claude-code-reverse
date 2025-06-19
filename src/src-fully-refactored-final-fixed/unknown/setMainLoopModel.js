/**
 * Sets the main loop model for the application, handling restrictions for Claude Pro users and updating state accordingly.
 *
 * @param {Object} options - The options object.
 * @param {string} options.args - The model name to set (e.g., "default", "opus-4", etc.).
 * @param {Function} options.onDone - Callback function to execute after setting the model or upon error.
 * @returns {null} Always returns null.
 */
function setMainLoopModel({ args: modelName, onDone }) {
  // useAppState returns a [state, setState] tuple
  const [currentState, setState] = useAppState();

  // If the model is "default", set to null; otherwise, use the provided model name
  const selectedModel = modelName === "default" ? null : modelName;

  // If resource is available and not in use, and the selected model includes "opus",
  // block the operation for Claude Pro users and notify via callback
  if (isResourceAvailableAndNotInUse() && selectedModel !== null && selectedModel.includes("opus")) {
    onDone(
      "Invalid model. Claude Pro users are not currently able to use Opus 4 in Claude Code. The current model is now Sonnet 4."
    );
    return null;
  }

  // Otherwise, asynchronously update the mainLoopModel in state and notify via callback
  setTimeout(() => {
    setState(prevState => ({
      ...prevState,
      mainLoopModel: selectedModel
    }));
    onDone(`Set model to ${FA.bold(getResourceDescription(selectedModel))}`);
  }, 0);

  return null;
}

module.exports = setMainLoopModel;