/**
 * Updates the main loop model throughout the application state and emits a configuration change event.
 *
 * @async
 * @function updateMainLoopModel
 * @param {string} newModel - The new model to set as the main loop model.
 * @returns {Promise<void>} Resolves when the model update and event emission are complete.
 */
async function updateMainLoopModel(newModel) {
  // Emit an event indicating the model has changed, including previous and new model values
  logTelemetryEventIfEnabled("tengu_config_model_changed", {
    from_model: W, // W is assumed to be the previous model (external/global)
    to_model: newModel
  });

  // Update the mainLoopModel property in the relevant state/store
  X(previousState => ({
    ...previousState,
    mainLoopModel: newModel
  }));

  // Update the model property in the state/store, converting the new model as needed
  renderToolUseConfirmationDialog(previousState => {
    const convertedModel = getResourceDescription(newModel); // getResourceDescription presumably converts or processes the model string

    // If the state has a 'model' property, replace isBlobOrFileLikeObject with the converted model
    if ("model" in previousState) {
      const { model: oldModel, ...restState } = previousState;
      return {
        ...restState,
        model: convertedModel
      };
    }
    // If no 'model' property exists, add isBlobOrFileLikeObject
    return {
      ...previousState,
      model: convertedModel
    };
  });
}

module.exports = updateMainLoopModel;