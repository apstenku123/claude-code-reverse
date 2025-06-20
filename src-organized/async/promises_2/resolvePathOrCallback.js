/**
 * Resolves a file system path using either a provided realpath method or a fallback resolution.
 *
 * @param {string} filePath - The path to resolve.
 * @param {Object} options - Configuration object, may contain a realpath method and a file system reference.
 * @param {Function} callback - Callback function to handle the resolved path or error.
 * @returns {any} The result of the callback invocation.
 */
function resolvePathOrCallback(filePath, options, callback) {
  // If no realpath method is provided, resolve the path using Qr9.resolve and call the callback
  if (!options.realpath) {
    return callback(null, Qr9.resolve(filePath));
  }
  // Otherwise, use the provided file system'createInteractionAccessor realpath method
  options.fs.realpath(filePath, callback);
}

module.exports = resolvePathOrCallback;