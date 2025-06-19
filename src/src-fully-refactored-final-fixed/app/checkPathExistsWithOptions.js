/**
 * Checks if a given path exists using provided options and invokes a callback with the result.
 *
 * @param {string} targetPath - The file or directory path to check.
 * @param {Object} [options={}] - Optional configuration for the check.
 * @param {number} [options.stale=10000] - Staleness threshold in milliseconds (minimum 2000).
 * @param {boolean} [options.realpath=true] - Whether to resolve the real path.
 * @param {Object} [options.fs=LT1] - File system module to use (must implement stat method).
 * @param {Function} callback - Callback function to handle the result. Receives (error, exists:boolean).
 * @returns {void}
 */
function checkPathExistsWithOptions(targetPath, options, callback) {
  // Set default options and override with provided options
  const mergedOptions = {
    stale: 10000, // default staleness threshold
    realpath: true, // resolve real path by default
    fs: LT1, // default file system module
    ...options
  };

  // Ensure stale is at least 2000ms
  mergedOptions.stale = Math.max(mergedOptions.stale || 0, 2000);

  // RT1 likely performs some async operation on the path
  RT1(targetPath, mergedOptions, (rt1Error, resolvedPath) => {
    if (rt1Error) {
      // If there was an error in RT1, pass isBlobOrFileLikeObject to the callback
      return callback(rt1Error);
    }

    // Use the fs.stat method to check if the path exists
    mergedOptions.fs.stat(getLockfilePath(resolvedPath, mergedOptions), (statError, stats) => {
      if (statError) {
        // If the error is ENOENT (file not found), treat as 'does not exist'
        if (statError.code === "ENOENT") {
          return callback(null, false);
        }
        // For other errors, pass the error to the callback
        return callback(statError);
      }
      // If no error, use TfA to determine if the path is considered 'fresh'
      // and invert the result: exists = !TfA(stats, mergedOptions)
      return callback(null, !TfA(stats, mergedOptions));
    });
  });
}

module.exports = checkPathExistsWithOptions;