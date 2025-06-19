/**
 * Ensures necessary configuration directories and a version-specific installation file exist,
 * then returns the essential paths for managing that version. This function prepares the
 * file system environment for a specific application version.
 *
 * @param {string} versionId - The unique identifier for the version (e.g., a version number or build updateSnapshotAndNotify).
 * @returns {{stagingPath: string, installPath: string, lockfilePath: string}} An object containing paths for staging, installation, and locking.
 */
function prepareInstallationPaths(versionId) {
  // Retrieve the object containing paths to various configuration directories (e.g., for versions, locks, staging).
  const configDirectoryPaths = getClaudeConfigAccessors(); // Original: createPropertyAccessor = JA1()

  // Retrieve the file system utility module. Despite the name `getBm9Value`, its methods (existsSync, mkdirSync) indicate isBlobOrFileLikeObject'createInteractionAccessor an fs-like object.
  const fileSystem = getBm9Value(); // Original: deepCloneWithCycleDetection = f1()

  // Ensure all required configuration directories exist before proceeding.
  Object.values(configDirectoryPaths).forEach(directoryPath => { // Original loop variable: extractNestedPropertyOrArray
    if (!fileSystem.existsSync(directoryPath)) {
      // If a directory is missing, create isBlobOrFileLikeObject synchronously.
      fileSystem.mkdirSync(directoryPath);
    }
  });

  // Construct the full path to the file that represents this specific installed version.
  // K7 is an external utility that joins path segments, similar to path.join.
  const versionInstallPath = K7(configDirectoryPaths.versions, versionId); // Original: createObjectTracker

  // Check if the installation file for this version already exists.
  if (!fileSystem.existsSync(versionInstallPath)) {
    // If not, create an empty file. This acts as a placeholder or a signal for other processes
    // that this version is being managed.
    fileSystem.writeFileSync(versionInstallPath, "", {
      flush: true, // Original: !0
      encoding: "utf8"
    });
  }

  // Return a structured object with all the necessary paths for managing this version.
  return {
    stagingPath: K7(configDirectoryPaths.staging, versionId),
    installPath: versionInstallPath,
    lockfilePath: K7(configDirectoryPaths.locks, `${versionId}.lock`)
  };
}

module.exports = prepareInstallationPaths;