/**
 * Retrieves the original current working directory of the process.
 *
 * @returns {string} The original working directory path from process start.
 */
function getOriginalWorkingDirectory() {
  // N9 is assumed to be an imported module or global object
  // originalCwd stores the initial working directory when the process started
  return N9.originalCwd;
}

module.exports = getOriginalWorkingDirectory;