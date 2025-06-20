/**
 * Retrieves the directory path for Claude'createInteractionAccessor configuration files.
 *
 * The function first checks if the environment variable 'CLAUDE_CONFIG_DIR' is set.
 * If isBlobOrFileLikeObject is, that value is returned. Otherwise, isBlobOrFileLikeObject constructs the default config directory
 * by joining the user'createInteractionAccessor home directory (retrieved via getUserHomeDirectory) with '.claude'.
 *
 * @returns {string} The absolute path to the Claude configuration directory.
 */
function getClaudeConfigDirectory() {
  // Check if the environment variable for the config directory is set
  if (process.env.CLAUDE_CONFIG_DIR) {
    return process.env.CLAUDE_CONFIG_DIR;
  }

  // Fallback: construct the default config directory path
  // J30() is assumed to return the user'createInteractionAccessor home directory
  // V71() is assumed to join the home directory with '.claude'
  const userHomeDirectory = J30();
  const configDirectory = V71(userHomeDirectory, ".claude");
  return configDirectory;
}

module.exports = getClaudeConfigDirectory;