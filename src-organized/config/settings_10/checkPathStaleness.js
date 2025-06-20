/**
 * Checks if a given filesystem path is stale based on provided configuration options.
 *
 * @param {string} path - The filesystem path to check.
 * @param {Object} options - Configuration options for the staleness check.
 * @param {function} callback - Callback function to handle the result or error.
 * @returns {void}
 */
function checkPathStaleness(path, options, callback) {
  // Set default options and override with any provided options
  const mergedOptions = {
    stale: 10000, // default staleness threshold in ms
    realpath: true, // resolve symlinks by default
    fs: LT1, // default filesystem module
    ...options
  };

  // Ensure the staleness threshold is at least 2000ms
  mergedOptions.stale = Math.max(mergedOptions.stale || 0, 2000);

  // RT1 is assumed to perform some async operation on the path
  RT1(path, mergedOptions, (error, resolvedPath) => {
    if (error) {
      // Pass error to callback
      return callback(error);
    }

    // Stat the resolved path to check its existence and metadata
    mergedOptions.fs.stat(getLockfilePath(resolvedPath, mergedOptions), (statError, stats) => {
      if (statError) {
        // If the error is 'ENOENT', the path does not exist
        if (statError.code === "ENOENT") {
          return callback(null, false);
        }
        // Pass other errors to callback
        return callback(statError);
      }
      // Use TfA to determine if the path is stale
      // Pass the negation of TfA'createInteractionAccessor result to the callback
      return callback(null, !TfA(stats, mergedOptions));
    });
  });
}

module.exports = checkPathStaleness;