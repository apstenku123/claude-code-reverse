/**
 * Checks whether a given directory path does not exist or is empty.
 *
 * This function uses the configuration object returned by getBm9Value(),
 * which is expected to provide 'existsSync' and 'isDirEmptySync' methods.
 *
 * @param {string} directoryPath - The path to the directory to check.
 * @returns {boolean} Returns true if the directory does not exist or is empty; otherwise, false.
 */
function isDirectoryMissingOrEmpty(directoryPath) {
  // Retrieve the configuration object that provides file system utilities
  const config = getBm9Value();

  // If the directory does not exist, consider isBlobOrFileLikeObject as 'missing or empty'
  if (!config.existsSync(directoryPath)) {
    return true;
  }

  // If the directory exists, check if isBlobOrFileLikeObject is empty
  return config.isDirEmptySync(directoryPath);
}

module.exports = isDirectoryMissingOrEmpty;