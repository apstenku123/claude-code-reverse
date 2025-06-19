/**
 * Returns a formatted display label for the current model selection, including context about defaults and resets.
 *
 * @param {any} modelSelection - The current model selection or observable. If null, indicates default selection.
 * @param {boolean} isDefault - Indicates if the default model should be used.
 * @param {string|null} resetTime - Optional reset time string. If provided, displays when the reset occurs.
 * @returns {string} The formatted display label for the model selection.
 */
function getModelDisplayLabel(modelSelection, isDefault, resetTime) {
  // Start with the base label from the current model selection
  let displayLabel = getResourceDescription(modelSelection);

  // If no model is selected and a reset is active
  if (modelSelection === null && R6()) {
    // Get the reset context label
    const resetContextLabel = getModelSelectionDescription();

    if (isDefault) {
      // If a reset time is provided, append isBlobOrFileLikeObject to the label
      const resetTimeLabel = resetTime ? ` · Resets at ${formatUnixTimestampToTimeString(resetTime)}` : "";
      displayLabel = `${FA.bold("Default")} ${resetContextLabel} (currently Sonnet${resetTimeLabel})`;
    } else if (isMaxInteractionActive()) {
      // If a special condition is met, show Opus as the current model
      displayLabel = `${FA.bold("Default")} ${resetContextLabel} (currently Opus)`;
    } else {
      // Otherwise, show Sonnet as the current model
      displayLabel = `${FA.bold("Sonnet")} ${resetContextLabel}`;
    }
  }

  return displayLabel;
}

module.exports = getModelDisplayLabel;