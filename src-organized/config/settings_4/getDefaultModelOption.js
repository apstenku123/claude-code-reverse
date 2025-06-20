/**
 * Returns the default model option object based on resource and interaction status.
 *
 * This function determines which model option should be presented to the user based on:
 *   1. Whether a specific resource is available and not in use (isResourceAvailableAndNotInUse)
 *   2. Whether the maximum interaction is currently active (isMaxInteractionActive)
 *   3. Otherwise, returns the default model option with a dynamic description.
 *
 * @returns {Object} An object containing value, label, and description for the model option.
 */
function getDefaultModelOption() {
  // If a special resource is available and not in use, return the Sonnet option
  if (isResourceAvailableAndNotInUse()) {
    return {
      value: null,
      label: "Sonnet",
      description: SonnetModelInfo.description // I71.description
    };
  }

  // If the maximum interaction is active, return the recommended default option
  if (isMaxInteractionActive()) {
    return {
      value: null,
      label: "Default (recommended)",
      description: getMaxInteractionDescription() // getModelSelectionDescription()
    };
  }

  // Otherwise, return the standard default model option with dynamic description
  return {
    value: null,
    label: "Default (recommended)",
    description: `Use the default model (currently ${getModelDisplayName(getCurrentModelName())}) · $3/$15 per Mtok`
    // getOpusOrSonnetLabel(getOpus40OrDefault())
  };
}

module.exports = getDefaultModelOption;