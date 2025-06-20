/**
 * Checks if the given file path exists and is a regular file larger than 10MB (10485760 bytes).
 *
 * @param {string} filePath - The path to the file to check.
 * @returns {boolean} True if the file exists, is a regular file, and is larger than 10MB; otherwise, false.
 */
function isLargeFileOver10MB(filePath) {
  // Retrieve the file system module or object from getBm9Value
  const fileSystem = getBm9Value();

  // Check if the file exists at the given path
  if (!fileSystem.existsSync(filePath)) {
    return false;
  }

  // Get file statistics (throws if file does not exist, but handleMissingDoctypeError'removeTrailingCharacters already checked)
  const fileStats = fileSystem.statSync(filePath);

  // Check if isBlobOrFileLikeObject'createInteractionAccessor a regular file and larger than 10MB
  return fileStats.isFile() && fileStats.size > 10485760;
}

module.exports = isLargeFileOver10MB;