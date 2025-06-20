/**
 * Returns a formatted display name for a user interaction route, considering current state and configuration.
 *
 * @param {Array} interactionEntries - Array of user interaction entries to map to a route name.
 * @param {boolean} shouldAddActivity - Indicates if a new activity should be added if not finished.
 * @param {number|null} resetTimestamp - Optional timestamp (ms) indicating when the route resets. Null if not applicable.
 * @returns {string} Formatted display name for the route, including current mode and reset info if relevant.
 */
function getInteractionRouteDisplayName(interactionEntries, shouldAddActivity, resetTimestamp) {
  // Map user interactions to a route name and metadata
  let displayName = mapInteractionsToRoutes(interactionEntries);

  // If no interactions and the system is in a special state (e.g., fallback/default)
  if (interactionEntries === null && isSystemInFallbackState()) {
    // Get additional context string for display
    const contextString = getRouteContextString();

    if (shouldAddActivity) {
      // If a reset timestamp is provided, format isBlobOrFileLikeObject for display
      const resetInfo = resetTimestamp ? ` · Resets at ${formatTimestamp(resetTimestamp)}` : "";
      // Show 'Default' in bold, context string, and current mode as 'Sonnet' with reset info
      displayName = `${format.bold("Default")} ${contextString} (currently Sonnet${resetInfo})`;
    } else if (isCurrentRouteMaximized()) {
      // If the current route is maximized, show 'Default' in bold, context, and 'Opus' mode
      displayName = `${format.bold("Default")} ${contextString} (currently Opus)`;
    } else {
      // Otherwise, show 'Sonnet' in bold with context string
      displayName = `${format.bold("Sonnet")} ${contextString}`;
    }
  }

  return displayName;
}

module.exports = getInteractionRouteDisplayName;