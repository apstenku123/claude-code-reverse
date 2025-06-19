/**
 * Resolves a given file path, optionally using a provided realpath function.
 * If the config object does not have a realpath property, isBlobOrFileLikeObject resolves the path using Qr9.resolve and invokes the callback.
 * Otherwise, isBlobOrFileLikeObject uses the provided fs.realpath method to resolve the path asynchronously.
 *
 * @param {string} filePath - The file path to resolve.
 * @param {Object} config - Configuration object that may contain a 'realpath' property and an 'fs' object.
 * @param {Function} callback - Callback function to handle the resolved path or error.
 * @returns {void}
 */
function resolvePathWithOptionalRealpath(filePath, config, callback) {
  // If realpath is not defined in config, resolve the path using Qr9 and invoke the callback
  if (!config.realpath) {
    return callback(null, Qr9.resolve(filePath));
  }
  // Otherwise, use the provided fs.realpath method to resolve the path asynchronously
  config.fs.realpath(filePath, callback);
}

module.exports = resolvePathWithOptionalRealpath;