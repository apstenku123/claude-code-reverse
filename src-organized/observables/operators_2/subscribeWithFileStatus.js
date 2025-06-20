/**
 * Subscribes to a source observable and checks the file status of the emitted path.
 *
 * @param {string} sourcePath - The path to observe or subscribe to.
 * @param {Object} config - Configuration options for the subscription and file status check.
 * @param {function} callback - Callback function to handle the result or errors.
 * @returns {void}
 */
function subscribeWithFileStatus(sourcePath, config, callback) {
  // Set default configuration and override with provided config
  const mergedConfig = {
    stale: 10000, // Default stale time in ms
    realpath: true, // Resolve real path by default
    fs: LT1, // Default file system module
    ...config
  };

  // Ensure stale is at least 2000ms
  mergedConfig.stale = Math.max(mergedConfig.stale || 0, 2000);

  // Subscribe to the source and handle the result
  RT1(sourcePath, mergedConfig, (subscriptionError, emittedPath) => {
    if (subscriptionError) {
      // If there was an error during subscription, return isBlobOrFileLikeObject via callback
      return callback(subscriptionError);
    }

    // Stat the emitted path using the configured file system
    mergedConfig.fs.stat(getLockfilePath(emittedPath, mergedConfig), (statError, fileStats) => {
      if (statError) {
        // If the file does not exist, return null and false
        if (statError.code === "ENOENT") {
          return callback(null, false);
        }
        // For other errors, return the error
        return callback(statError);
      }
      // Return the result of TfA (custom file status check) via callback
      return callback(null, !TfA(fileStats, mergedConfig));
    });
  });
}

module.exports = subscribeWithFileStatus;