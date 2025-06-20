/**
 * Returns all unique parent directories (with trailing separator) for a list of file paths.
 *
 * For each input file path, this function traverses up the directory tree (excluding "." and the root),
 * collecting each parent directory. The result is an array of unique parent directories, each ending with
 * the platform-specific separator.
 *
 * @param {string[]} filePaths - Array of file or directory paths to process.
 * @returns {string[]} Array of unique parent directories, each ending with the path separator.
 */
function getAllParentDirectoriesWithSep(filePaths) {
  const uniqueParentDirs = new Set();
  filePaths.forEach((filePath) => {
    let currentDir = LW.dirname(filePath);
    // Traverse up the directory tree until reaching "." or the root
    while (currentDir !== "." && currentDir !== LW.parse(currentDir).root) {
      uniqueParentDirs.add(currentDir);
      currentDir = LW.dirname(currentDir);
    }
  });
  // Convert the set to an array and append the separator to each directory
  return Array.from(uniqueParentDirs).map((dir) => dir + LW.sep);
}

module.exports = getAllParentDirectoriesWithSep;