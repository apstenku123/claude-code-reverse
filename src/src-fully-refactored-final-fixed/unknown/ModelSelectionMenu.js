/**
 * Displays a model selection menu and handles user selection or cancellation.
 *
 * @param {Object} params - The parameters object.
 * @param {Function} params.onDone - Callback to be called when the user selects or cancels the model selection.
 * @returns {React.Element} The rendered model selection menu React element.
 */
function ModelSelectionMenu({ onDone }) {
  // Retrieve the current main loop model and a setter function from useAppState()
  const [{ mainLoopModel: currentModel }, setMainLoopModel] = useAppState();

  // Register a handler for escape/cancel actions
  D0((_, event) => {
    if (event.escape) {
      // Notify the system that the model selection menu was cancelled
      logTelemetryEventIfEnabled("tengu_model_command_menu", { action: "cancel" });

      // Use the current model or fallback to the default label from getDefaultModelOption()
      const modelLabel = currentModel ?? getDefaultModelOption().label;

      // Notify the caller that the model was kept
      onDone(`Kept model as ${FA.bold(modelLabel)}`);
      return;
    }
  });

  // Render the model selection menu component
  return s$.createElement(ModelSelector, {
    initial: currentModel,
    onSelect: selectedModel => {
      // Notify the system of the model change
      logTelemetryEventIfEnabled("tengu_model_command_menu", {
        action: selectedModel,
        from_model: currentModel,
        to_model: selectedModel
      });

      // Update the main loop model in the state
      setMainLoopModel(prevState => ({
        ...prevState,
        mainLoopModel: selectedModel
      }));

      // Notify the caller of the new model selection
      onDone(`Set model to ${FA.bold(getResourceDescription(selectedModel))}`);
    }
  });
}

module.exports = ModelSelectionMenu;