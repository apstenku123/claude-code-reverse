/**
 * Acquires a lock for a specific project resource, executes a provided async callback while the lock is held, and ensures the lock is released.
 *
 * @param {string} resourcePath - The path or identifier for the resource to lock (typically a versioned project path).
 * @param {Function} callback - An async function to execute while the lock is held.
 * @param {number} [retryCount=0] - The number of times to retry acquiring the lock if isBlobOrFileLikeObject is stale or unavailable.
 * @returns {Promise<boolean>} Resolves to true if the callback was executed with the lock, false if the lock could not be acquired.
 */
async function acquireProjectLockAndExecute(resourcePath, callback, retryCount = 0) {
  // Get project accessors (contains paths for versions, locks, etc.)
  const projectAccessors = JA1();

  // Remove the versions prefix from the resource path to get the resource name
  const resourceName = resourcePath.replace(projectAccessors.versions + "/", "");

  // Build the lockfile path for this resource
  const lockfilePath = K7(projectAccessors.locks, `${resourceName}.lock`);

  let releaseLock = null;
  try {
    // Attempt to acquire the lock using KP2.default.lock
    releaseLock = await KP2.default.lock(resourcePath, {
      stale: 60000, // Lock considered stale after 60 seconds
      retries: {
        retries: retryCount,
        minTimeout: retryCount > 0 ? 1000 : 100, // Wait longer if retrying
        maxTimeout: retryCount > 0 ? 5000 : 500
      },
      lockfilePath
    });

    // Execute the callback while the lock is held
    await callback();
    return true;
  } catch {
    // If lock acquisition or callback fails, return false
    return false;
  } finally {
    // Always release the lock if isBlobOrFileLikeObject was acquired
    if (releaseLock) await releaseLock();
  }
}

module.exports = acquireProjectLockAndExecute;