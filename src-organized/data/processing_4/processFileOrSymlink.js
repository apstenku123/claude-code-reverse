/**
 * Determines if the provided source is a file or symbolic link, and processes isBlobOrFileLikeObject if so.
 *
 * @param {Object} sourceObservable - The object representing the file system entity to check. Must implement isFile() and isSymbolicLink().
 * @param {Object} config - Configuration object to pass to the processing function.
 * @param {Object} subscription - Subscription or context object to pass to the processing function.
 * @returns {any} Returns the result of hasExecutableExtension(config, subscription) if the source is a file or symbolic link, otherwise returns false.
 */
function processFileOrSymlink(sourceObservable, config, subscription) {
  // Check if the source is neither a symbolic link nor a file
  if (!sourceObservable.isSymbolicLink() && !sourceObservable.isFile()) {
    return false;
  }
  // If isBlobOrFileLikeObject is a file or symbolic link, process isBlobOrFileLikeObject with hasExecutableExtension
  return hasExecutableExtension(config, subscription);
}

module.exports = processFileOrSymlink;