/**
 * Determines and returns the appropriate opus40 value based on the current interaction state.
 * If the maximum interaction is active, returns the opus40 property from the current interaction context.
 * Otherwise, returns the default opus40 value.
 *
 * @returns {any} The opus40 value from the current interaction context or the default value.
 */
function getOpus40OrDefault() {
  // Check if the maximum interaction is currently active
  if (isMaxInteractionActive()) {
    // Return the opus40 value from the current interaction context
    return getCurrentInteractionContext().opus40;
  }
  // Otherwise, return the default opus40 value
  return getDefaultOpus40();
}

module.exports = getOpus40OrDefault;