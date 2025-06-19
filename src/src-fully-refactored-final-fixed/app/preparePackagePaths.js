/**
 * Prepares and ensures the existence of necessary directories and files for a given package name.
 *
 * This function retrieves configuration paths, ensures that all required directories exist,
 * creates an empty version file if isBlobOrFileLikeObject does not exist, and returns the key paths for staging,
 * installation, and lockfile for the specified package.
 *
 * @param {string} packageName - The name of the package for which to prepare paths.
 * @returns {{ stagingPath: string, installPath: string, lockfilePath: string }}
 *   An object containing the staging directory path, install file path, and lockfile path for the package.
 */
function preparePackagePaths(packageName) {
  // Retrieve the configuration object containing directory paths
  const config = JA1();
  // Retrieve the file system utility object
  const fileSystem = f1();

  // Ensure all directories in the config exist
  Object.values(config).forEach(directoryPath => {
    if (!fileSystem.existsSync(directoryPath)) {
      fileSystem.mkdirSync(directoryPath);
    }
  });

  // Compute the install path for the package version
  const installPath = K7(config.versions, packageName);

  // If the install file does not exist, create an empty file with UTF-8 encoding and flush option
  if (!fileSystem.existsSync(installPath)) {
    fileSystem.writeFileSync(installPath, "", {
      flush: true,
      encoding: "utf8"
    });
  }

  // Return the relevant paths for the package
  return {
    stagingPath: K7(config.staging, packageName),
    installPath: installPath,
    lockfilePath: K7(config.locks, `${packageName}.lock`)
  };
}

module.exports = preparePackagePaths;