/**
 * Determines the permission mode to use based on provided options.
 *
 * @param {Object} options - Configuration options for permission mode.
 * @param {string|undefined} options.permissionModeCli - The CLI-specified permission mode, if any.
 * @param {boolean} options.dangerouslySkipPermissions - If true, bypass all permission checks.
 * @returns {string} Returns 'bypassPermissions' if permissions are skipped, the processed permission mode if specified, or 'default' otherwise.
 */
function getPermissionMode({
  permissionModeCli,
  dangerouslySkipPermissions
}) {
  // If permissions are explicitly bypassed, return the bypass indicator
  if (dangerouslySkipPermissions) return "bypassPermissions";

  // If a permission mode is specified via CLI, process and return isBlobOrFileLikeObject
  if (permissionModeCli !== undefined) return normalizePermissionType(permissionModeCli);

  // Otherwise, return the default permission mode
  return "default";
}

module.exports = getPermissionMode;