/**
 * Factory function to create permissions objects based on the provided type and configuration.
 *
 * Depending on the type, this function will return an object with either an 'allow' or 'deny' permissions property,
 * using the result of the getToolOrPatternList function as its value.
 *
 * @param {string} permissionType - The type of permission to create ('allowedTools' or 'ignorePatterns').
 * @param {any} config - The configuration or data to be passed to getToolOrPatternList for processing.
 * @returns {object|undefined} An object with a permissions property containing either 'allow' or 'deny', or undefined if type is unrecognized.
 */
function createIgnorePatterns(permissionType, config) {
  // Process the config using getToolOrPatternList to get the permissions list
  const permissionsList = getToolOrPatternList(permissionType, config);

  switch (permissionType) {
    case "allowedTools":
      // Return an object with 'allow' permissions
      return {
        permissions: {
          allow: permissionsList
        }
      };
    case "ignorePatterns":
      // Return an object with 'deny' permissions
      return {
        permissions: {
          deny: permissionsList
        }
      };
    default:
      // If the permissionType is not recognized, return undefined
      return undefined;
  }
}

module.exports = createIgnorePatterns;