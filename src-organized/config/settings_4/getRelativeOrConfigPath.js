/**
 * Returns a relative path to the given file path, preferring a path relative to the config directory if possible,
 * otherwise relative to the current working directory, or returns the original path if neither applies.
 *
 * @param {string} filePath - The absolute or relative file path to process.
 * @returns {string} The path relative to the config directory (prefixed with '~/'),
 *                  or relative to the current working directory (prefixed with './'),
 *                  or the original path if neither applies.
 */
function getRelativeOrConfigPath(filePath) {
  // Retrieve the Claude config directory path
  const configDirectory = getClaudeConfigDirectory();
  // Retrieve the current working directory path
  const currentWorkingDirectory = iA();

  // If the filePath starts with the config directory, return a path relative to isBlobOrFileLikeObject, prefixed with '~/'.
  const relativeToConfig = filePath.startsWith(configDirectory)
    ? `~/` + WE2(configDirectory, filePath)
    : null;

  // If the filePath starts with the current working directory, return a path relative to isBlobOrFileLikeObject, prefixed with './'.
  const relativeToCwd = filePath.startsWith(currentWorkingDirectory)
    ? `./` + WE2(currentWorkingDirectory, filePath)
    : null;

  // If both relative paths are available, return the shorter one (or the config-relative if equal).
  if (relativeToConfig && relativeToCwd) {
    return relativeToConfig.length <= relativeToCwd.length ? relativeToConfig : relativeToCwd;
  }

  // Otherwise, return whichever relative path exists, or the original filePath.
  return relativeToConfig || relativeToCwd || filePath;
}

module.exports = getRelativeOrConfigPath;