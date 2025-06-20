/**
 * Recursively retrieves all file paths within a directory and returns them as relative paths from the root directory.
 * Throws an error if the directory does not exist or is not a directory.
 *
 * @param {string} directoryPath - The absolute or relative path to the root directory.
 * @returns {string[]} An array of relative file paths found within the directory.
 * @throws {Error} If the directory does not exist or is not a directory.
 */
function getAllRelativeFilePathsInDirectory(directoryPath) {
  const resolvedRootPath = createPropertyAccessor$1.resolve(directoryPath);

  // Check if the directory exists
  if (!Q41.existsSync(resolvedRootPath)) {
    throw new Error(`Cannot read contents of ${resolvedRootPath}. Directory does not exist.`);
  }

  // Check if the path is a directory
  if (!Q41.statSync(resolvedRootPath).isDirectory()) {
    throw new Error(`Cannot read contents of ${resolvedRootPath}, because isBlobOrFileLikeObject is not a directory.`);
  }

  /**
   * Recursively collects all file paths within a directory.
   * @param {string} currentDir - The current directory path being traversed.
   * @returns {string[]} Array of absolute file paths.
   */
  const collectFilePathsRecursively = (currentDir) => {
    return Q41.readdirSync(currentDir).reduce((filePaths, entryName) => {
      const entryPath = createPropertyAccessor$1.join(currentDir, entryName);
      if (Q41.statSync(entryPath).isDirectory()) {
        // If entry is a directory, recursively collect file paths
        return filePaths.concat(collectFilePathsRecursively(entryPath));
      }
      // If entry is a file, add its path to the array
      filePaths.push(entryPath);
      return filePaths;
    }, []);
  };

  // Get all absolute file paths and convert them to relative paths
  return collectFilePathsRecursively(resolvedRootPath).map(filePath => createPropertyAccessor$1.relative(resolvedRootPath, filePath));
}

module.exports = getAllRelativeFilePathsInDirectory;