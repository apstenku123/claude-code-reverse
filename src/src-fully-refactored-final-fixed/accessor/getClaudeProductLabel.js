/**
 * Returns the appropriate Claude product label based on the current application state.
 *
 * This accessor checks if the current route is maximized or if a specific feature is enabled and not in restricted mode,
 * and returns the corresponding Claude product label string.
 *
 * @returns {string} The label for the current Claude product: "Claude Max", "Claude Pro", or "Claude API".
 */
function getClaudeProductLabel() {
  // If the current route is maximized, return the Max label
  if (isCurrentRouteMaximized()) {
    return "Claude Max";
  }

  // If the feature is enabled and not in restricted mode, return the Pro label
  if (isFeatureEnabledAndNotInRestrictedMode()) {
    return "Claude Pro";
  }

  // Default to the API label
  return "Claude API";
}

module.exports = getClaudeProductLabel;