/**
 * Generates a descriptive label for the current route interaction, including context about the default state,
 * the current model (Sonnet or Opus), and optional reset timing information.
 *
 * @param {Array} interactionEntries - Array of user interaction entries to map to route names and context.
 * @param {boolean} shouldAddActivity - Indicates whether to add a new activity if not finished.
 * @param {number|null} resetTimestamp - Optional timestamp indicating when the route interaction resets.
 * @returns {string} a formatted label describing the current route interaction state.
 */
function getRouteInteractionLabel(interactionEntries, shouldAddActivity, resetTimestamp) {
  // Map the interaction entries to a route name and context
  let routeLabel = mapInteractionsToRouteNames(interactionEntries);

  // If no interaction entries and the max route interaction feature is enabled
  if (interactionEntries === null && isMaxRouteInteractionEnabled()) {
    // Get the current model label (e.g., "(beta)", "(stable)", etc.)
    const modelLabel = getModelSelectionDescription();

    if (shouldAddActivity) {
      // If a reset timestamp is provided, format isBlobOrFileLikeObject for display
      const resetInfo = resetTimestamp ? ` · Resets at ${formatUnixTimestampToTimeString(resetTimestamp)}` : "";
      // Label: Default (bold), model label, currently Sonnet, and optional reset info
      routeLabel = `${FA.bold("Default")} ${modelLabel} (currently Sonnet${resetInfo})`;
    } else if (isMaxInteractionActive()) {
      // If the current model is Opus
      routeLabel = `${FA.bold("Default")} ${modelLabel} (currently Opus)`;
    } else {
      // Fallback: Sonnet is the current model
      routeLabel = `${FA.bold("Sonnet")} ${modelLabel}`;
    }
  }

  return routeLabel;
}

module.exports = getRouteInteractionLabel;