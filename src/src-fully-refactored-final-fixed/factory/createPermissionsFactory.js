/**
 * Factory function to create permissions objects based on the provided type.
 *
 * Depending on the permissionType, this function will return an object
 * with either an 'allow' or 'deny' property under 'permissions',
 * using the result of processPermissionEntries.
 *
 * @param {string} permissionType - The type of permission to process ('allowedTools' or 'ignorePatterns').
 * @param {any} permissionConfig - The configuration or entries to process for permissions.
 * @returns {object|undefined} An object containing the permissions, or undefined if permissionType is unrecognized.
 */
function createPermissionsFactory(permissionType, permissionConfig) {
  // Process the permission entries using the external getToolOrPatternList function
  const processedPermissions = getToolOrPatternList(permissionType, permissionConfig);

  switch (permissionType) {
    case "allowedTools":
      // Return permissions object with 'allow' property
      return {
        permissions: {
          allow: processedPermissions
        }
      };
    case "ignorePatterns":
      // Return permissions object with 'deny' property
      return {
        permissions: {
          deny: processedPermissions
        }
      };
    default:
      // If permissionType is not recognized, return undefined
      return undefined;
  }
}

module.exports = createPermissionsFactory;