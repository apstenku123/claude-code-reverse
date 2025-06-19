/**
 * Checks if a given path exists using provided configuration and calls the callback with the result.
 *
 * @param {string} path - The path to check for existence.
 * @param {Object} options - Configuration options for the check.
 * @param {function} callback - Callback function to handle the result or error.
 * @returns {void}
 */
function checkPathExistsWithConfig(path, options, callback) {
  // Set default options and override with user-provided options
  const mergedOptions = {
    stale: 10000, // default stale time in ms
    realpath: true, // resolve real path by default
    fs: LT1, // default filesystem module
    ...options
  };

  // Ensure stale is at least 2000ms
  mergedOptions.stale = Math.max(mergedOptions.stale || 0, 2000);

  // RT1 likely performs some async operation on the path
  RT1(path, mergedOptions, (error, resolvedPath) => {
    if (error) {
      // Pass error to callback
      return callback(error);
    }
    // Stat the resolved path to check if isBlobOrFileLikeObject exists
    mergedOptions.fs.stat(getLockfilePath(resolvedPath, mergedOptions), (statError, stats) => {
      if (statError) {
        // If file does not exist, return null and false
        if (statError.code === "ENOENT") {
          return callback(null, false);
        }
        // For other errors, pass the error to callback
        return callback(statError);
      }
      // Use TfA to determine if the file is valid according to options
      return callback(null, !TfA(stats, mergedOptions));
    });
  });
}

module.exports = checkPathExistsWithConfig;