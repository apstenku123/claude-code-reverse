/**
 * Returns a Set containing the default working directory and any additional working directories specified.
 *
 * @param {Object} options - Options for retrieving working directories.
 * @param {Array<string>} options.additionalWorkingDirectories - An array of additional working directory paths.
 * @returns {Set<string>} a Set containing the default working directory and all additional working directories.
 */
function getUniqueWorkingDirectories(options) {
  // Retrieve the default working directory using the external C4 function
  const defaultWorkingDirectory = C4();

  // Combine the default directory with additional directories, ensuring uniqueness via Set
  const allWorkingDirectories = [
    defaultWorkingDirectory,
    ...options.additionalWorkingDirectories
  ];

  return new Set(allWorkingDirectories);
}

module.exports = getUniqueWorkingDirectories;