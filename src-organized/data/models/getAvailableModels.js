/**
 * Retrieves the list of available models, including custom or user-selected models if applicable.
 *
 * This function gathers the base model list, checks for a selected or default model,
 * and ensures that the returned list includes any custom models as needed.
 *
 * @returns {Array<Object>} Array of model objects, each with value, label, and optional description.
 */
function getAvailableModels() {
  // Retrieve the base list of models
  const baseModels = getResourceInteractionOptions();

  // Attempt to get the currently selected model from two possible sources
  let selectedModel = null;
  const modelFromPb = getAnthropicModelName();
  const modelFromM01 = M01();

  if (modelFromPb !== undefined && modelFromPb !== null) {
    selectedModel = modelFromPb;
  } else if (modelFromM01 !== null) {
    selectedModel = modelFromM01;
  }

  // If no selected model, or if the selected model is already in the base list, return the base list
  if (
    selectedModel === null ||
    baseModels.some(model => model.value === selectedModel)
  ) {
    return baseModels;
  }

  // If the selected model is a special built-in model, push the corresponding object
  if ($B0(selectedModel)) {
    baseModels.push(selectedModel === "sonnet" ? UB0 : By1);
  } else {
    // Otherwise, add a custom model entry
    baseModels.push({
      value: selectedModel,
      label: selectedModel,
      description: "Custom model"
    });
  }

  return baseModels;
}

module.exports = getAvailableModels;