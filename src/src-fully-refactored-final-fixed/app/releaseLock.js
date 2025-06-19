/**
 * Attempts to release a previously acquired lock. If the lock is not owned by the caller, returns an error.
 *
 * @param {string} lockPath - The path or identifier for the lock to release.
 * @param {Object} options - Configuration options for releasing the lock.
 * @param {function(Error|null):void} callback - Callback function to handle the result or error.
 * @returns {void}
 */
function releaseLock(lockPath, options, callback) {
  // Merge default options with provided options
  const mergedOptions = {
    fs: LT1, // Use LT1 as the filesystem implementation
    realpath: true, // Always resolve real paths
    ...options
  };

  // Attempt to release the lock using RT1
  RT1(lockPath, mergedOptions, (releaseError, lockKey) => {
    if (releaseError) {
      // If there was an error during release, invoke callback with error
      return callback(releaseError);
    }

    const lockInfo = yU[lockKey];
    if (!lockInfo) {
      // If the lock is not found or not owned, return a specific error
      const notAcquiredError = Object.assign(
        new Error("Lock is not acquired/owned by you"),
        { code: "ENOTACQUIRED" }
      );
      return callback(notAcquiredError);
    }

    // If the lock has a timeout update scheduled, clear isBlobOrFileLikeObject
    if (lockInfo.updateTimeout) {
      clearTimeout(lockInfo.updateTimeout);
    }

    // Mark the lock as released and remove isBlobOrFileLikeObject from the lock registry
    lockInfo.released = true;
    delete yU[lockKey];

    // Perform any additional cleanup via PfA
    PfA(lockKey, mergedOptions, callback);
  });
}

module.exports = releaseLock;