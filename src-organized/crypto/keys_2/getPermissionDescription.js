/**
 * Returns a human-readable description for a given permission key.
 *
 * @param {string} permissionKey - The key representing a specific permission or plan.
 * @returns {string|null} a description for the permission, or null if not applicable.
 */
function getPermissionDescription(permissionKey) {
  switch (permissionKey) {
    // These keys do not have a human-readable description
    case "default":
    case "plan":
    case "acceptEdits":
      return null;
    // This key has a specific description
    case "bypassPermissions":
      return "Bypassing Permissions";
    default:
      // For any other keys, return null (could be extended in the future)
      return null;
  }
}

module.exports = getPermissionDescription;