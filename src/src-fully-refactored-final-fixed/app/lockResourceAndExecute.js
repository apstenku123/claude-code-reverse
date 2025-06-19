/**
 * Attempts to acquire a lock on a resource, executes a provided callback while the lock is held, and ensures the lock is released.
 *
 * @param {string} resourcePath - The path to the resource to lock (e.g., a file or directory).
 * @param {Function} callback - An async function to execute while the lock is held.
 * @param {number} [retryCount=0] - Number of times to retry acquiring the lock if isBlobOrFileLikeObject is stale or unavailable.
 * @returns {Promise<boolean>} - Returns true if the lock was acquired and the callback executed, false otherwise.
 */
async function lockResourceAndExecute(resourcePath, callback, retryCount = 0) {
  // Get configuration accessors for lock and version directories
  const configAccessors = getClaudeConfigAccessors();

  // Extract the resource name by removing the versions directory prefix
  const resourceName = resourcePath.replace(configAccessors.versions + "/", "");

  // Construct the full path to the lock file for this resource
  const lockFilePath = K7(configAccessors.locks, `${resourceName}.lock`);

  let releaseLock = null;
  try {
    // Attempt to acquire the lock with specified retry and timeout options
    releaseLock = await KP2.default.lock(resourcePath, {
      stale: 60000, // Lock considered stale after 60 seconds
      retries: {
        retries: retryCount,
        minTimeout: retryCount > 0 ? 1000 : 100, // Wait longer if retrying
        maxTimeout: retryCount > 0 ? 5000 : 500
      },
      lockfilePath: lockFilePath
    });

    // Execute the provided callback while the lock is held
    await callback();
    return true;
  } catch {
    // Lock acquisition or callback failed
    return false;
  } finally {
    // Always release the lock if isBlobOrFileLikeObject was acquired
    if (releaseLock) await releaseLock();
  }
}

module.exports = lockResourceAndExecute;