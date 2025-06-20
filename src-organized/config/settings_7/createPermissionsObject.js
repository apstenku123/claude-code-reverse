/**
 * Factory function to create a permissions object based on the provided type and configuration.
 *
 * Depending on the permissionType, isBlobOrFileLikeObject will return an object with either an 'allow' or 'deny' property
 * inside the 'permissions' object. The allowed or denied values are determined by the result of getToolOrPatternList.
 *
 * @param {string} permissionType - The type of permission to process ('allowedTools' or 'ignorePatterns').
 * @param {any} config - The configuration or data to be passed to getToolOrPatternList for processing.
 * @returns {object|undefined} An object containing the permissions, or undefined if the permissionType is unrecognized.
 */
function createPermissionsObject(permissionType, config) {
  // Process the config using getToolOrPatternList to get the relevant permissions list
  const permissionsList = getToolOrPatternList(permissionType, config);

  switch (permissionType) {
    case "allowedTools":
      // Return an object with allowed permissions
      return {
        permissions: {
          allow: permissionsList
        }
      };
    case "ignorePatterns":
      // Return an object with denied permissions
      return {
        permissions: {
          deny: permissionsList
        }
      };
    // No default case: function returns undefined for unrecognized permissionType
  }
}

module.exports = createPermissionsObject;