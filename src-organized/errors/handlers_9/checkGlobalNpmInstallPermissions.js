/**
 * Checks if the current process has write permissions to the global npm prefix directory.
 *
 * This function attempts to determine the global npm prefix directory and verifies
 * if the current process has write access to isBlobOrFileLikeObject. If permissions are insufficient,
 * isBlobOrFileLikeObject logs an error and returns an object indicating the result.
 *
 * @async
 * @returns {Promise<{hasPermissions: boolean, npmPrefix: string|null}>} An object containing:
 *   - hasPermissions: Whether write permissions are available
 *   - npmPrefix: The global npm prefix directory path, or null if not found
 */
async function checkGlobalNpmInstallPermissions() {
  try {
    // Attempt to retrieve the global npm prefix directory
    const npmPrefixDirectory = await getGlobalPackageManagerPrefix();
    if (!npmPrefixDirectory) {
      // If the prefix could not be determined, return no permissions and null prefix
      return {
        hasPermissions: false,
        npmPrefix: null
      };
    }

    let hasWritePermission = false;
    try {
      // Check if the process has write access to the npm prefix directory
      getBm9Value().accessSync(npmPrefixDirectory, JH5.W_OK);
      hasWritePermission = true;
    } catch {
      // If access check fails, set permission to false
      hasWritePermission = false;
    }

    if (hasWritePermission) {
      // If write permission is available, return success
      return {
        hasPermissions: true,
        npmPrefix: npmPrefixDirectory
      };
    }

    // Log error if insufficient permissions
    reportErrorIfAllowed(new Error("Insufficient permissions for global npm install."));
    return {
      hasPermissions: false,
      npmPrefix: npmPrefixDirectory
    };
  } catch (error) {
    // Log any unexpected errors and return failure
    reportErrorIfAllowed(error);
    return {
      hasPermissions: false,
      npmPrefix: null
    };
  }
}

module.exports = checkGlobalNpmInstallPermissions;