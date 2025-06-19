/**
 * Returns all unique parent directories (with trailing separator) for a list of file paths.
 *
 * For each input path, this function traverses up the directory tree,
 * collecting each parent directory (excluding "." and the filesystem root),
 * and returns a list of unique directories with the platform-specific separator appended.
 *
 * @param {string[]} filePaths - Array of file or directory paths to process.
 * @returns {string[]} Array of unique parent directories, each ending with the path separator.
 */
function getAllParentDirectoriesWithTrailingSeparator(filePaths) {
  const uniqueDirectories = new Set();

  filePaths.forEach((filePath) => {
    let currentDir = LW.dirname(filePath);
    // Traverse up the directory tree until reaching "." or the filesystem root
    while (currentDir !== "." && currentDir !== LW.parse(currentDir).root) {
      uniqueDirectories.add(currentDir);
      currentDir = LW.dirname(currentDir);
    }
  });

  // Convert the Set to an array and append the separator to each directory
  return Array.from(uniqueDirectories).map((dir) => dir + LW.sep);
}

module.exports = getAllParentDirectoriesWithTrailingSeparator;