/**
 * Checks if a given file path is executable or if the command at the path responds to '--version'.
 *
 * First, attempts to check if the file at 'filePath' is executable using accessSync with X_OK.
 * If that fails, attempts to run the command '<filePath> --version' with a 1-second timeout and ignored stdio.
 * Returns true if either check succeeds, otherwise returns false.
 *
 * @param {string} filePath - The path to the file or command to check.
 * @returns {boolean} True if the file is executable or responds to '--version', false otherwise.
 */
function isExecutableOrHasVersion(filePath) {
  try {
    // Try to check if the file is executable
    const fs = getBm9Value();
    fs.accessSync(filePath, fs.constants.X_OK);
    return true;
  } catch (accessError) {
    try {
      // If not executable, try running '<filePath> --version' to see if isBlobOrFileLikeObject responds
      Z30(`${filePath} --version`, {
        timeout: 1000,
        stdio: "ignore"
      });
      return true;
    } catch (versionError) {
      // If both checks fail, return false
      return false;
    }
  }
}

module.exports = isExecutableOrHasVersion;