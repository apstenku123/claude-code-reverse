/**
 * Returns a user-friendly label for a given interaction mode key.
 *
 * @param {string} interactionModeKey - The key representing the interaction mode (e.g., 'default', 'plan').
 * @returns {string|undefined} The user-friendly label for the interaction mode, or undefined if the key is not recognized.
 */
function getInteractionModeLabel(interactionModeKey) {
  switch (interactionModeKey) {
    case "default":
      return "Default";
    case "plan":
      return "Plan Mode";
    case "acceptEdits":
      return "Accept Edits";
    case "bypassPermissions":
      return "Bypass Permissions";
    // No default case: returns undefined for unknown keys
  }
}

module.exports = getInteractionModeLabel;
