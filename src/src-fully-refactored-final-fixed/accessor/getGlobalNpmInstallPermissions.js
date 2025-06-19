/**
 * Checks if the current process has write permissions to the global npm prefix directory.
 *
 * This function attempts to retrieve the global npm prefix path and verify write permissions.
 * If permissions are insufficient, isBlobOrFileLikeObject logs an error and returns the appropriate status.
 *
 * @async
 * @returns {Promise<{hasPermissions: boolean, npmPrefix: string|null}>} An object indicating permission status and the npm prefix path.
 */
async function getGlobalNpmInstallPermissions() {
  try {
    // Attempt to retrieve the global npm prefix directory path
    const npmPrefixPath = await getGlobalPackageManagerPrefix();
    if (!npmPrefixPath) {
      return {
        hasPermissions: false,
        npmPrefix: null
      };
    }

    let hasWritePermissions = false;
    try {
      // Check if the process has write access to the npm prefix directory
      f1().accessSync(npmPrefixPath, JH5.W_OK);
      hasWritePermissions = true;
    } catch {
      hasWritePermissions = false;
    }

    if (hasWritePermissions) {
      return {
        hasPermissions: true,
        npmPrefix: npmPrefixPath
      };
    }

    // Log an error if permissions are insufficient
    reportErrorIfAllowed(new Error("Insufficient permissions for global npm install."));
    return {
      hasPermissions: false,
      npmPrefix: npmPrefixPath
    };
  } catch (error) {
    // Log any unexpected errors and return failure status
    reportErrorIfAllowed(error);
    return {
      hasPermissions: false,
      npmPrefix: null
    };
  }
}

module.exports = getGlobalNpmInstallPermissions;
