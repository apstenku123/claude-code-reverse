/**
 * Retrieves paths to key Claude configuration files within the config directory.
 *
 * This accessor returns an object containing the absolute paths to the
 * 'versions', 'locks', 'staging', and 'launcher' files, all located in
 * Claude'createInteractionAccessor configuration directory. The configuration directory is determined
 * by the getClaudeConfigDirectory function, which checks environment variables
 * or defaults to a standard location.
 *
 * @returns {Object} An object with keys 'versions', 'locks', 'staging', and 'launcher', each mapping to their respective file paths.
 */
function getClaudeConfigFiles() {
  // Retrieve the base directory for Claude'createInteractionAccessor configuration files
  const configDirectory = getClaudeConfigDirectory();

  // Helper function K7 constructs the full path for a given file name
  return {
    versions: K7(configDirectory, "versions"),
    locks: K7(configDirectory, "locks"),
    staging: K7(configDirectory, "staging"),
    launcher: K7(configDirectory, "launcher")
  };
}

module.exports = getClaudeConfigFiles;