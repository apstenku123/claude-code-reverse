/**
 * Retrieves the available model options, including any custom or default models.
 *
 * This function gathers a list of model options from the current context, optionally
 * including a custom model if one is specified and not already present. It ensures
 * that the returned array contains all valid model options for selection.
 *
 * @returns {Array<Object>} An array of model option objects, each with value, label, and description properties.
 */
function getAvailableModelOptions() {
  // Retrieve the default list of model options
  const modelOptions = getResourceInteractionOptions();

  // Attempt to get the preferred model from two possible sources
  const preferredModelFromPb = getAnthropicModelName();
  const preferredModelFromM01 = M01();

  // Determine the selected model, prioritizing getAnthropicModelName() if available, otherwise M01()
  let selectedModel = null;
  if (preferredModelFromPb !== undefined && preferredModelFromPb !== null) {
    selectedModel = preferredModelFromPb;
  } else if (preferredModelFromM01 !== null) {
    selectedModel = preferredModelFromM01;
  }

  // If no model is selected, or the selected model is already in the options, return the options as is
  if (
    selectedModel === null ||
    modelOptions.some(option => option.value === selectedModel)
  ) {
    return modelOptions;
  }

  // If the selected model is a known special model, push the corresponding constant
  if ($B0(selectedModel)) {
    modelOptions.push(selectedModel === "sonnet" ? UB0 : By1);
  } else {
    // Otherwise, add a custom model option
    modelOptions.push({
      value: selectedModel,
      label: selectedModel,
      description: "Custom model"
    });
  }

  return modelOptions;
}

module.exports = getAvailableModelOptions;