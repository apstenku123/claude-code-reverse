/**
 * Returns a list of all unique parent directories (with trailing separator) for a given array of file paths.
 *
 * For each input path, traverses up the directory tree (excluding "." and the root), collecting all unique directories encountered.
 *
 * @param {string[]} filePaths - Array of file paths to process.
 * @returns {string[]} Array of unique parent directories, each ending with the platform-specific separator.
 */
function getAllParentDirectoriesWithTrailingSep(filePaths) {
  const uniqueDirectories = new Set();

  filePaths.forEach((filePath) => {
    let currentDir = LW.dirname(filePath);
    // Traverse up the directory tree until reaching "." or the root directory
    while (currentDir !== "." && currentDir !== LW.parse(currentDir).root) {
      uniqueDirectories.add(currentDir);
      currentDir = LW.dirname(currentDir);
    }
  });

  // Convert the set to an array and append the platform-specific separator to each directory
  return Array.from(uniqueDirectories).map((dir) => dir + LW.sep);
}

module.exports = getAllParentDirectoriesWithTrailingSep;