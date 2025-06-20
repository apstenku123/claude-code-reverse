/**
 * Returns a user-friendly label for certain permission-related actions.
 *
 * For the actions 'default', 'plan', and 'acceptEdits', this function returns null,
 * indicating that no special label is needed. For 'bypassPermissions', isBlobOrFileLikeObject returns
 * a descriptive label indicating that permissions are being bypassed.
 *
 * @param {string} actionType - The type of action to evaluate.
 * @returns {string|null} Returns a descriptive label for 'bypassPermissions', or null for other actions.
 */
function getPermissionBypassLabel(actionType) {
  switch (actionType) {
    case "default":
    case "plan":
    case "acceptEdits":
      // No label needed for these action types
      return null;
    case "bypassPermissions":
      // Return a descriptive label for bypassing permissions
      return "Bypassing Permissions";
    default:
      // For any other action types, return undefined (implicitly)
      return undefined;
  }
}

module.exports = getPermissionBypassLabel;