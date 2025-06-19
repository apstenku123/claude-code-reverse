/**
 * Returns an array of available model options, including custom or default models based on current selection.
 *
 * This function gathers the list of available models, determines the current model selection from two possible sources,
 * and ensures the returned list includes the current selection (adding isBlobOrFileLikeObject as a custom model if necessary).
 *
 * @returns {Array<Object>} Array of model option objects, each with value, label, and (optionally) description.
 */
function getAvailableModelsList() {
  // Retrieve the base list of available models
  const availableModels = getResourceInteractionOptions();
  let selectedModel = null;

  // Attempt to get the current model selection from two sources
  const modelFromPrimarySource = getAnthropicModelName();
  const modelFromSecondarySource = M01();

  // Prefer the primary source if defined, otherwise use the secondary source
  if (modelFromPrimarySource !== undefined && modelFromPrimarySource !== null) {
    selectedModel = modelFromPrimarySource;
  } else if (modelFromSecondarySource !== null) {
    selectedModel = modelFromSecondarySource;
  }

  // If no model is selected, or the selected model is already in the list, return the list as is
  if (
    selectedModel === null ||
    availableModels.some(modelOption => modelOption.value === selectedModel)
  ) {
    return availableModels;
  }

  // If the selected model is a known special case, add the corresponding predefined model object
  if ($B0(selectedModel)) {
    availableModels.push(selectedModel === "sonnet" ? UB0 : By1);
  } else {
    // Otherwise, add a custom model option for the selected model
    availableModels.push({
      value: selectedModel,
      label: selectedModel,
      description: "Custom model"
    });
  }

  return availableModels;
}

module.exports = getAvailableModelsList;