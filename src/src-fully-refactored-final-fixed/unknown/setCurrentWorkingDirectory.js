/**
 * Sets the current working directory for the N9 context.
 *
 * @param {string} directoryPath - The path to set as the current working directory.
 * @returns {void}
 * @description Updates the N9 object'createInteractionAccessor cwd property to the specified directory path.
 */
function setCurrentWorkingDirectory(directoryPath) {
  // Set the current working directory in the N9 context
  N9.cwd = directoryPath;
}

module.exports = setCurrentWorkingDirectory;