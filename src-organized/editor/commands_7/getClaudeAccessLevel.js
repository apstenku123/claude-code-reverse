/**
 * Determines the current Claude access level based on interaction and resource status.
 *
 * This function checks if the maximum interaction is active or if a resource is available and not in use,
 * and returns the corresponding Claude access level as a string.
 *
 * @returns {string} The current Claude access level: "Claude Max", "Claude Pro", or "Claude API".
 */
function getClaudeAccessLevel() {
  // Check if the maximum interaction is currently active
  if (isMaxInteractionActive()) {
    return "Claude Max";
  }

  // Check if the resource is available and not currently in use
  if (isResourceAvailableAndNotInUse()) {
    return "Claude Pro";
  }

  // Default access level if neither condition above is met
  return "Claude API";
}

module.exports = getClaudeAccessLevel;