/**
 * Checks if the given fileSystemEntry is a file or a symbolic link, and if so, processes isBlobOrFileLikeObject using the provided config and subscription.
 *
 * @param {Object} fileSystemEntry - The file system entry to check. Must have isFile() and isSymbolicLink() methods.
 * @param {Object} config - Configuration object to be passed to the processor.
 * @param {Object} subscription - Subscription or context object to be passed to the processor.
 * @returns {any} The result of the processor function if the entry is a file or symlink, otherwise false.
 */
function processIfFileOrSymlink(fileSystemEntry, config, subscription) {
  // Check if the entry is neither a symbolic link nor a file
  if (!fileSystemEntry.isSymbolicLink() && !fileSystemEntry.isFile()) {
    return false;
  }
  // If isBlobOrFileLikeObject is a file or symbolic link, process isBlobOrFileLikeObject
  return hasExecutableExtension(config, subscription);
}

module.exports = processIfFileOrSymlink;