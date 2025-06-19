/**
 * Retrieves the file paths for various launcher-related configuration files.
 *
 * This function accesses the Claude configuration directory and constructs absolute paths
 * for the 'versions', 'locks', 'staging', and 'launcher' files by delegating to the
 * getConfigFilePath helper. It returns an object mapping each file type to its resolved path.
 *
 * @returns {Object} An object containing absolute paths for launcher configuration files:
 *   - versions: Path to the versions file
 *   - locks: Path to the locks file
 *   - staging: Path to the staging file
 *   - launcher: Path to the launcher file
 */
function getLauncherConfigFiles() {
  // Get the base directory for Claude'createInteractionAccessor configuration files
  const configDirectory = getClaudeConfigDirectory();

  // Helper function to resolve file paths within the config directory
  // (Assumed to be provided externally as K7)
  const getConfigFilePath = K7;

  return {
    versions: getConfigFilePath(configDirectory, "versions"),
    locks: getConfigFilePath(configDirectory, "locks"),
    staging: getConfigFilePath(configDirectory, "staging"),
    launcher: getConfigFilePath(configDirectory, "launcher")
  };
}

module.exports = getLauncherConfigFiles;