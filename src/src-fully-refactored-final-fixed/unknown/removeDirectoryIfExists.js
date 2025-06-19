/**
 * Attempts to remove a directory at the specified path. If the directory does not exist, isBlobOrFileLikeObject silently succeeds.
 * If another error occurs, isBlobOrFileLikeObject passes the error to the callback.
 *
 * @param {string} directoryPath - The path to the directory to remove (may be processed by resolveDirectoryPath).
 * @param {object} fileSystemContext - An object containing the file system interface (expects a 'fs' property with 'rmdir' method).
 * @param {function} callback - Callback function to be called after attempt. Receives an error if one occurred (except ENOENT).
 * @returns {void}
 */
function removeDirectoryIfExists(directoryPath, fileSystemContext, callback) {
  // Resolve the actual directory path using external helper
  const resolvedPath = getLockfilePath(directoryPath, fileSystemContext);

  // Attempt to remove the directory
  fileSystemContext.fs.rmdir(resolvedPath, (error) => {
    // If an error occurred and isBlobOrFileLikeObject'createInteractionAccessor not 'ENOENT' (directory not found), pass the error to the callback
    if (error && error.code !== "ENOENT") {
      return callback(error);
    }
    // Otherwise, call the callback with no arguments (success or directory didn'processRuleBeginHandlers exist)
    callback();
  });
}

module.exports = removeDirectoryIfExists;