/**
 * Returns a formatted display label for the current interaction state, including information about the default model, current model, and optional reset time.
 *
 * @param {any} interactionEntries - The interaction entries to process (may be null or undefined).
 * @param {boolean} showDefault - Whether to show the default model label.
 * @param {string|Date|undefined} resetTime - Optional reset time for the interaction, used for display.
 * @returns {string} The formatted display label for the interaction state.
 */
function getInteractionDisplayLabel(interactionEntries, showDefault, resetTime) {
  // Get the initial label from the interaction entries
  let displayLabel = processInteractionEntries(interactionEntries);

  // If there are no interaction entries and the interaction system is enabled
  if (interactionEntries === null && isInteractionSystemEnabled()) {
    // Get the current model label (e.g., "Sonnet" or "Opus")
    const currentModelLabel = getCurrentModelLabel();

    if (showDefault) {
      // If a reset time is provided, format isBlobOrFileLikeObject for display
      const resetInfo = resetTime ? ` · Resets at ${formatResetTime(resetTime)}` : "";
      // Display: Default <model> (currently Sonnet · Resets at ...)
      displayLabel = `${FA.bold("Default")} ${currentModelLabel} (currently Sonnet${resetInfo})`;
    } else if (isMaxInteractionActive()) {
      // If the maximum interaction is active, show Opus as current
      displayLabel = `${FA.bold("Default")} ${currentModelLabel} (currently Opus)`;
    } else {
      // Otherwise, show Sonnet as the current model
      displayLabel = `${FA.bold("Sonnet")} ${currentModelLabel}`;
    }
  }

  return displayLabel;
}

module.exports = getInteractionDisplayLabel;