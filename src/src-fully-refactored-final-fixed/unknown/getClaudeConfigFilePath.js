/**
 * Returns the absolute path to the Claude configuration file.
 *
 * This function checks if a legacy configuration file ('.config.json') exists in the Claude config directory.
 * If isBlobOrFileLikeObject exists, its path is returned. Otherwise, isBlobOrFileLikeObject returns the path to the current configuration file ('.claude.json'),
 * located either in the directory specified by the CLAUDE_CONFIG_DIR environment variable or in the default config directory.
 *
 * @returns {string} Absolute path to the Claude configuration file (either legacy or current).
 */
function getClaudeConfigFilePath() {
  // Get the directory where Claude configuration files are stored
  const configDirectory = getClaudeConfigDirectory();

  // Build the full path to the legacy config file
  const legacyConfigFilePath = buildPath(configDirectory, ".config.json");

  // Check if the legacy config file exists using the file system module
  if (getBm9Value().existsSync(legacyConfigFilePath)) {
    return legacyConfigFilePath;
  }

  // Determine the config directory: use environment variable or fallback to default
  const configDirFromEnv = process.env.CLAUDE_CONFIG_DIR || getDefaultConfigDirectory();
  const currentConfigFilePath = buildPath(configDirFromEnv, ".claude.json");

  return currentConfigFilePath;
}

module.exports = getClaudeConfigFilePath;