/**
 * Returns a user-friendly display name for a given mode key.
 *
 * @param {string} modeKey - The internal key representing a mode (e.g., 'default', 'plan').
 * @returns {string|undefined} The user-friendly display name for the mode, or undefined if the key is unrecognized.
 */
function getModeDisplayName(modeKey) {
  switch (modeKey) {
    case "default":
      return "Default";
    case "plan":
      return "Plan Mode";
    case "acceptEdits":
      return "Accept Edits";
    case "bypassPermissions":
      return "Bypass Permissions";
    // No default case: returns undefined for unrecognized keys
  }
}

module.exports = getModeDisplayName;
