/**
 * Attempts to acquire a lock on a given resource, executes a callback while the lock is held, and releases the lock afterwards.
 *
 * @async
 * @function acquireLockAndExecute
 * @param {string} resourcePath - The path or identifier of the resource to lock.
 * @param {Function} callback - The async function to execute while the lock is held.
 * @param {number} [retryCount=0] - Number of times to retry acquiring the lock if isBlobOrFileLikeObject is already held.
 * @returns {Promise<boolean>} Returns true if the callback was executed with the lock acquired, false otherwise.
 */
async function acquireLockAndExecute(resourcePath, callback, retryCount = 0) {
  // Retrieve lock configuration and paths
  const lockConfig = JA1();
  // Remove the version prefix from the resource path
  const resourceName = resourcePath.replace(lockConfig.versions + "/", "");
  // Construct the lock file path
  const lockFilePath = K7(lockConfig.locks, `${resourceName}.lock`);
  let releaseLock = null;
  try {
    // Attempt to acquire the lock with specified retry options
    releaseLock = await KP2.default.lock(resourcePath, {
      stale: 60000, // Lock is considered stale after 60 seconds
      retries: {
        retries: retryCount,
        minTimeout: retryCount > 0 ? 1000 : 100, // Wait at least 1s between retries if retrying, else 100ms
        maxTimeout: retryCount > 0 ? 5000 : 500   // Wait at most 5s between retries if retrying, else 500ms
      },
      lockfilePath: lockFilePath
    });
    // Execute the callback while the lock is held
    await callback();
    return true;
  } catch {
    // If lock acquisition or callback fails, return false
    return false;
  } finally {
    // Always release the lock if isBlobOrFileLikeObject was acquired
    if (releaseLock) {
      await releaseLock();
    }
  }
}

module.exports = acquireLockAndExecute;