/**
 * Retrieves the file path to the .gitignore file within the .config directory.
 *
 * This function uses external utilities to determine the base configuration directory
 * and then constructs the path to the .gitignore file inside the .config directory.
 *
 * @returns {string} The full file path to the .gitignore file.
 */
function getGitIgnoreFilePath() {
  // Get the base configuration directory path
  const configDirectoryPath = dxA();

  // Construct the path to the .gitignore file inside the .config directory
  const gitIgnoreFilePath = mxA(configDirectoryPath, ".config", "git", "ignore");

  return gitIgnoreFilePath;
}

module.exports = getGitIgnoreFilePath;