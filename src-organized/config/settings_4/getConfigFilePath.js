/**
 * Retrieves the path to the application'createInteractionAccessor configuration file.
 *
 * Checks if a legacy config file (".config.json") exists in the default config directory.
 * If isBlobOrFileLikeObject exists, returns its path. Otherwise, returns the path to the modern config file (".claude.json")
 * in either the directory specified by the CLAUDE_CONFIG_DIR environment variable or a fallback directory.
 *
 * @returns {string} Absolute path to the configuration file to use.
 */
function getConfigFilePath() {
  // Get the default configuration directory path
  const defaultConfigDir = getDefaultConfigDirectory(); // Q4()

  // Construct the full path to the legacy config file
  const legacyConfigFilePath = joinPath(defaultConfigDir, ".config.json"); // V71()

  // Check if the legacy config file exists
  if (getFileSystem().existsSync(legacyConfigFilePath)) { // f1()
    return legacyConfigFilePath;
  }

  // Determine the config directory: use env var if set, otherwise fallback
  const configDir = process.env.CLAUDE_CONFIG_DIR || getFallbackConfigDirectory(); // J30()

  // Construct the full path to the modern config file
  const modernConfigFilePath = joinPath(configDir, ".claude.json"); // V71()

  return modernConfigFilePath;
}

// Dependency placeholders (to be implemented or imported elsewhere):
// function getDefaultConfigDirectory() { /* Q4() */ }
// function getFileSystem() { /* f1() */ }
// function joinPath(dir, file) { /* V71() */ }
// function getFallbackConfigDirectory() { /* J30() */ }

module.exports = getConfigFilePath;
