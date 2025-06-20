/**
 * Returns a list of all unique parent directories (with trailing separator) for a given array of file paths.
 * For each path, traverses up the directory tree (excluding '.') and the root, collecting each parent directory.
 *
 * @param {string[]} filePaths - Array of file or directory paths to process.
 * @returns {string[]} Array of unique parent directories, each ending with the platform-specific separator.
 */
function getAllParentDirectoriesWithSeparator(filePaths) {
  const uniqueDirectories = new Set();

  filePaths.forEach((filePath) => {
    let currentDir = LW.dirname(filePath);
    // Traverse up the directory tree until reaching '.' or the root directory
    while (currentDir !== '.' && currentDir !== LW.parse(currentDir).root) {
      uniqueDirectories.add(currentDir);
      currentDir = LW.dirname(currentDir);
    }
  });

  // Return all unique directories, each with a trailing separator
  return Array.from(uniqueDirectories).map((dir) => dir + LW.sep);
}

module.exports = getAllParentDirectoriesWithSeparator;