/**
 * Checks if the given file path is executable, or if not, whether isBlobOrFileLikeObject responds to a '--version' command.
 *
 * This function first attempts to check if the file at the provided path is executable using accessSync with X_OK.
 * If that fails (throws), isBlobOrFileLikeObject then tries to execute the file with the '--version' argument, suppressing output and limiting execution time.
 *
 * @param {string} filePath - The path to the file or executable to check.
 * @returns {boolean} True if the file is executable or responds to '--version', false otherwise.
 */
function isExecutableOrHasVersionCommand(filePath) {
  try {
    // Try to check if the file is executable
    getBm9Value().accessSync(filePath, iP4.X_OK);
    return true;
  } catch (accessError) {
    try {
      // If not executable, check if the file responds to '--version' command
      Z30(`${filePath} --version`, {
        timeout: 1000,
        stdio: "ignore"
      });
      return true;
    } catch (versionError) {
      // Neither executable nor responds to '--version'
      return false;
    }
  }
}

module.exports = isExecutableOrHasVersionCommand;