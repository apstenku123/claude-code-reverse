/**
 * Attempts to acquire a file lock with retries and customizable options.
 * Handles lock acquisition, retry logic, and lock release callbacks.
 *
 * @param {string} filePath - The path to the file to lock.
 * @param {Object} options - Configuration options for lock acquisition and retry behavior.
 * @param {Function} callback - Callback function to be called after lock acquisition attempt.
 * @returns {void}
 */
function acquireFileLockWithRetries(filePath, options, callback) {
  // Set default options and override with provided options
  const defaultOptions = {
    stale: 10000, // Default stale time in ms
    update: null, // Time between lock updates
    realpath: true, // Whether to resolve real path
    retries: 0, // Number of retry attempts
    fs: LT1, // File system module
    onCompromised: (error) => { throw error; } // Handler for compromised lock
  };

  const lockOptions = {
    ...defaultOptions,
    ...options
  };

  // Normalize retries option
  lockOptions.retries = lockOptions.retries || 0;
  lockOptions.retries = typeof lockOptions.retries === "number"
    ? { retries: lockOptions.retries }
    : lockOptions.retries;

  // Ensure stale is at least 2000ms
  lockOptions.stale = Math.max(lockOptions.stale || 0, 2000);

  // Set update interval: default to half of stale, clamp between 1000ms and stale/2
  lockOptions.update = lockOptions.update == null
    ? lockOptions.stale / 2
    : lockOptions.update || 0;
  lockOptions.update = Math.max(Math.min(lockOptions.update, lockOptions.stale / 2), 1000);

  // Begin lock acquisition process
  RT1(filePath, lockOptions, (lockError, lockKey) => {
    if (lockError) return callback(lockError);

    // Create a retry operation for lock acquisition
    const retryOperation = Ir9.operation(lockOptions.retries);
    retryOperation.attempt(() => {
      // Attempt to acquire the lock
      MT1(lockKey, lockOptions, (acquireError, mtime, mtimePrecision) => {
        // Retry if error and retry policy allows
        if (retryOperation.retry(acquireError)) return;
        if (acquireError) return callback(retryOperation.mainError());

        // Store lock metadata
        const lockInfo = yU[lockKey] = {
          lockfilePath: getLockfilePath(lockKey, lockOptions),
          mtime,
          mtimePrecision,
          options: lockOptions,
          lastUpdate: Date.now()
        };

        // Perform any post-acquisition logic
        scheduleLockfileUpdate(lockKey, lockOptions);

        // Provide a release callback to the user
        callback(null, (releaseCallback) => {
          if (lockInfo.released) {
            // If already released, return error
            return releaseCallback && releaseCallback(Object.assign(
              new Error("Lock is already released"),
              { code: "ERELEASED" }
            ));
          }
          // Release the lock
          SfA(lockKey, {
            ...lockOptions,
            realpath: false // normalizeToError not resolve realpath on release
          }, releaseCallback);
        });
      });
    });
  });
}

module.exports = acquireFileLockWithRetries;