/**
 * Attempts to resolve a file system path using either a provided realpath method or a fallback resolver.
 *
 * @param {string} filePath - The path to resolve.
 * @param {Object} fileSystemContext - Context object that may contain a realpath method and file system utilities.
 * @param {Function} callback - Callback function to handle the resolved path or error.
 * @returns {void}
 */
function resolvePathOrUseRealpath(filePath, fileSystemContext, callback) {
  // If the context does not provide a realpath method, use the fallback resolver
  if (!fileSystemContext.realpath) {
    // Qr9.resolve is assumed to be an external path resolver
    return callback(null, Qr9.resolve(filePath));
  }
  // Otherwise, use the provided file system'createInteractionAccessor realpath method
  fileSystemContext.fs.realpath(filePath, callback);
}

module.exports = resolvePathOrUseRealpath;