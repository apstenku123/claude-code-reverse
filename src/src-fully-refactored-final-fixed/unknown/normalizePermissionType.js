/**
 * Normalizes a given permission type string to one of the allowed values.
 *
 * @param {string} permissionType - The permission type to normalize. Can be one of:
 *   'bypassPermissions', 'acceptEdits', 'plan', or 'default'.
 *   Any other value will be normalized to 'default'.
 * @returns {string} The normalized permission type string.
 */
function normalizePermissionType(permissionType) {
  switch (permissionType) {
    case "bypassPermissions":
      return "bypassPermissions";
    case "acceptEdits":
      return "acceptEdits";
    case "plan":
      return "plan";
    case "default":
      return "default";
    default:
      // For any unknown permission type, default to 'default'
      return "default";
  }
}

module.exports = normalizePermissionType;
