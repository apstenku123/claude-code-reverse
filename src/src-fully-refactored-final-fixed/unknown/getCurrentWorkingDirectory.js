/**
 * Retrieves the current working directory from the N9 module.
 *
 * @returns {string} The current working directory path.
 */
function getCurrentWorkingDirectory() {
  // Return the current working directory as provided by the N9 module
  return N9.cwd;
}

module.exports = getCurrentWorkingDirectory;