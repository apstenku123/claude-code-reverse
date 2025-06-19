/**
 * Returns a Set containing the default working directory and any additional working directories provided.
 *
 * @param {Object} options - An object containing additional working directories.
 * @param {string[]} options.additionalWorkingDirectories - Array of additional working directory paths.
 * @returns {Set<string>} a Set containing the default working directory and all additional working directories.
 */
function getWorkingDirectoriesSet(options) {
  // Retrieve the default working directory using C4()
  const defaultWorkingDirectory = C4();

  // Combine the default working directory with any additional ones, ensuring uniqueness via Set
  return new Set([
    defaultWorkingDirectory,
    ...options.additionalWorkingDirectories
  ]);
}

module.exports = getWorkingDirectoriesSet;