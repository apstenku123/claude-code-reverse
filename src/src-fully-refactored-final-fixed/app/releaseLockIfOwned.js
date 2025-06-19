/**
 * Attempts to release a lock if isBlobOrFileLikeObject is currently owned by the caller.
 *
 * @param {string} lockPath - The path or identifier for the lock to release.
 * @param {Object} options - Configuration options for releasing the lock.
 * @param {Function} callback - Callback function to be called with the result or error.
 * @returns {void}
 */
function releaseLockIfOwned(lockPath, options, callback) {
  // Merge default options with provided options
  const mergedOptions = {
    fs: LT1, // File system module or abstraction
    realpath: true,
    ...options
  };

  // Attempt to release the lock using RT1 (likely an async lock handler)
  RT1(lockPath, mergedOptions, (error, lockKey) => {
    if (error) {
      // If there was an error acquiring lock info, pass isBlobOrFileLikeObject to the callback
      return callback(error);
    }

    const lockInfo = yU[lockKey]; // Retrieve lock info from global lock map
    if (!lockInfo) {
      // If lock is not owned by the caller, return a specific error
      return callback(Object.assign(
        new Error("Lock is not acquired/owned by you"),
        { code: "ENOTACQUIRED" }
      ));
    }

    // If there is a timeout for updating the lock, clear isBlobOrFileLikeObject
    if (lockInfo.updateTimeout) {
      clearTimeout(lockInfo.updateTimeout);
    }
    lockInfo.released = true; // Mark the lock as released
    delete yU[lockKey]; // Remove lock info from the global lock map

    // Call PfA to perform any additional cleanup or notification
    PfA(lockKey, mergedOptions, callback);
  });
}

module.exports = releaseLockIfOwned;