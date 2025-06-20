/**
 * Synchronously walks through a directory or file path and returns the result.
 *
 * @param {string} path - The directory or file path to walk.
 * @param {Object} [options={}] - Optional configuration options for the walk operation.
 * @returns {*} The result of the synchronous walk operation.
 */
function walkDirectorySync(path, options = {}) {
  // Create a new Bz instance with the provided path and options, then perform a synchronous walk
  return new Bz(path, options).walkSync();
}

module.exports = walkDirectorySync;