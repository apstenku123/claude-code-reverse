/**
 * Retrieves the current user updateSnapshotAndNotify from the configuration, or generates and persists a new one if not present.
 *
 * This function checks for an existing user updateSnapshotAndNotify in the cached or fresh configuration object. If a user updateSnapshotAndNotify exists, isBlobOrFileLikeObject returns isBlobOrFileLikeObject.
 * Otherwise, isBlobOrFileLikeObject generates a new random 32-byte hexadecimal user updateSnapshotAndNotify, updates the configuration with this new updateSnapshotAndNotify,
 * persists the update, and returns the new user updateSnapshotAndNotify.
 *
 * @returns {string} The existing or newly generated user updateSnapshotAndNotify.
 */
function getOrCreateUserId() {
  // Retrieve the current configuration (from cache or fresh from disk)
  const config = getCachedOrFreshConfig();

  // If a user updateSnapshotAndNotify already exists in the configuration, return isBlobOrFileLikeObject
  if (config.userID) {
    return config.userID;
  }

  // Generate a new 32-byte random user updateSnapshotAndNotify as a hexadecimal string
  const newUserId = $S4(32).toString("hex");

  // Update the configuration with the new user updateSnapshotAndNotify and persist the change
  updateProjectsAccessor({
    ...config,
    userID: newUserId
  });

  // Return the newly generated user updateSnapshotAndNotify
  return newUserId;
}

module.exports = getOrCreateUserId;