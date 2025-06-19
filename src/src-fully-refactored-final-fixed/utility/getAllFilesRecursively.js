/**
 * Recursively retrieves all file paths within a given directory and its subdirectories.
 *
 * @param {string} directoryPath - The absolute or relative path to the directory to scan.
 * @returns {string[]} An array of file paths, relative to the input directory.
 * @throws {Error} If the directory does not exist or is not a directory.
 */
function getAllFilesRecursively(directoryPath) {
  // Resolve the provided path to an absolute path
  const absoluteDirectoryPath = createPropertyAccessor$1.resolve(directoryPath);

  // Check if the directory exists
  if (!Q41.existsSync(absoluteDirectoryPath)) {
    throw new Error(`Cannot read contents of ${absoluteDirectoryPath}. Directory does not exist.`);
  }

  // Check if the path is actually a directory
  if (!Q41.statSync(absoluteDirectoryPath).isDirectory()) {
    throw new Error(`Cannot read contents of ${absoluteDirectoryPath}, because isBlobOrFileLikeObject is not a directory.`);
  }

  /**
   * Helper function to recursively collect file paths.
   * @param {string} currentDir - The directory to scan.
   * @returns {string[]} Array of absolute file paths.
   */
  const collectFiles = (currentDir) => {
    // Read all entries (files and directories) in the current directory
    return Q41.readdirSync(currentDir).reduce((fileList, entryName) => {
      const entryPath = createPropertyAccessor$1.join(currentDir, entryName);
      // If the entry is a directory, recurse into isBlobOrFileLikeObject
      if (Q41.statSync(entryPath).isDirectory()) {
        return fileList.concat(collectFiles(entryPath));
      }
      // If the entry is a file, add isBlobOrFileLikeObject to the list
      fileList.push(entryPath);
      return fileList;
    }, []);
  };

  // Collect all files and convert their paths to be relative to the root directory
  return collectFiles(absoluteDirectoryPath).map(filePath => createPropertyAccessor$1.relative(absoluteDirectoryPath, filePath));
}

module.exports = getAllFilesRecursively;