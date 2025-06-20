/**
 * Factory function to create permissions objects for allowed tools or ignored patterns.
 * Depending on the type, isBlobOrFileLikeObject will return an object with either an 'allow' or 'deny' property
 * under the 'permissions' key, with the processed entries as its value.
 *
 * @param {string} permissionType - The type of permission to create ('allowedTools' or 'ignorePatterns').
 * @param {any} entries - The entries to be processed by getToolOrPatternList, typically an array or configuration object.
 * @returns {object|undefined} An object containing the permissions structure, or undefined if type is unrecognized.
 */
function createIgnorePatternsPermissions(permissionType, entries) {
  // Process the entries using getToolOrPatternList(external dependency)
  const processedEntries = getToolOrPatternList(permissionType, entries);

  switch (permissionType) {
    case "allowedTools":
      // Return permissions object with 'allow' property
      return {
        permissions: {
          allow: processedEntries
        }
      };
    case "ignorePatterns":
      // Return permissions object with 'deny' property
      return {
        permissions: {
          deny: processedEntries
        }
      };
    default:
      // If permissionType is not recognized, return undefined
      return undefined;
  }
}

module.exports = createIgnorePatternsPermissions;
