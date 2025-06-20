/**
 * Attempts to acquire a file lock with retry logic and configurable options.
 * Handles lock acquisition, retrying on failure, and provides a release callback.
 *
 * @param {string} filePath - The path to the file to lock.
 * @param {Object} options - Configuration options for lock acquisition.
 * @param {function} callback - Callback function to handle the result or error.
 * @returns {void}
 */
function acquireFileLockWithRetry(filePath, options, callback) {
  // Set default options and merge with provided options
  const mergedOptions = {
    stale: 10000, // Default stale time in ms
    update: null, // Time between lock updates
    realpath: true, // Whether to resolve real path
    retries: 0, // Number of retry attempts
    fs: LT1, // File system module
    onCompromised: (error) => {
      throw error;
    },
    ...options
  };

  // Ensure retries is a number or an object with a retries property
  if (!mergedOptions.retries) {
    mergedOptions.retries = 0;
  }
  mergedOptions.retries = typeof mergedOptions.retries === "number"
    ? { retries: mergedOptions.retries }
    : mergedOptions.retries;

  // Ensure stale is at least 2000ms
  mergedOptions.stale = Math.max(mergedOptions.stale || 0, 2000);

  // Set update interval: default to half of stale, but clamp between 1000ms and stale/2
  mergedOptions.update = mergedOptions.update == null
    ? mergedOptions.stale / 2
    : mergedOptions.update || 0;
  mergedOptions.update = Math.max(
    Math.min(mergedOptions.update, mergedOptions.stale / 2),
    1000
  );

  // Begin the lock acquisition process
  RT1(filePath, mergedOptions, (lockError, lockKey) => {
    if (lockError) {
      return callback(lockError);
    }

    // Create a retry operation for lock acquisition
    const retryOperation = Ir9.operation(mergedOptions.retries);

    retryOperation.attempt(() => {
      // Attempt to acquire the lock
      MT1(lockKey, mergedOptions, (acquireError, mtime, mtimePrecision) => {
        // If a retryable error occurred, try again
        if (retryOperation.retry(acquireError)) {
          return;
        }
        // If error is not retryable, return the main error
        if (acquireError) {
          return callback(retryOperation.mainError());
        }

        // Store lock state in global lock map
        const lockInfo = yU[lockKey] = {
          lockfilePath: getLockfilePath(lockKey, mergedOptions),
          mtime,
          mtimePrecision,
          options: mergedOptions,
          lastUpdate: Date.now()
        };

        // Perform any post-lock setup
        scheduleLockfileUpdate(lockKey, mergedOptions);

        // Provide a release callback to the user
        callback(null, (releaseCallback) => {
          if (lockInfo.released) {
            // If already released, return an error
            return releaseCallback && releaseCallback(Object.assign(
              new Error("Lock is already released"),
              { code: "ERELEASED" }
            ));
          }
          // Release the lock
          SfA(lockKey, {
            ...mergedOptions,
            realpath: false // normalizeToError not resolve real path on release
          }, releaseCallback);
        });
      });
    });
  });
}

module.exports = acquireFileLockWithRetry;