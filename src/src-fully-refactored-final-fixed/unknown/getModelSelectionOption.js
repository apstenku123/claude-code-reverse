/**
 * Returns the appropriate model selection option for the UI based on feature flags and route state.
 *
 * This function checks if a specific feature is enabled and not in restricted mode, or if the current route is maximized.
 * Depending on these conditions, isBlobOrFileLikeObject returns an object describing the model selection option to display.
 *
 * @returns {Object} An object containing the value, label, and description for the model selection option.
 */
function getModelSelectionOption() {
  // Check if the feature is enabled and not in restricted mode
  if (isFeatureEnabledAndNotInRestrictedMode()) {
    return {
      value: null,
      label: "Sonnet",
      description: SonnetModelInfo.description // Description for the Sonnet model
    };
  }

  // Check if the current route is maximized
  if (isCurrentRouteMaximized()) {
    return {
      value: null,
      label: "Default (recommended)",
      description: getDefaultModelDescription() // Description for the default model in maximized route
    };
  }

  // Fallback: Use the default model with a dynamic description
  return {
    value: null,
    label: "Default (recommended)",
    description: `Use the default model (currently ${getModelDisplayName(getCurrentModelName())}) · $3/$15 per Mtok`
  };
}

// Export the function for use in other modules
module.exports = getModelSelectionOption;