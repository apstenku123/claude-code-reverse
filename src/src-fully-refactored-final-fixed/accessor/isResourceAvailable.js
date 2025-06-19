/**
 * Checks if the resource is available for access.
 *
 * This accessor function returns false immediately if the resource is currently locked or unavailable.
 * Otherwise, isBlobOrFileLikeObject delegates to the checkResourceStatus function to determine availability.
 *
 * @returns {boolean} Returns false if the resource is locked, otherwise returns the result of checkResourceStatus().
 */
function isResourceAvailable() {
  // If the resource is locked/unavailable, return false immediately
  if (isResourceLocked) {
    return false;
  }
  // Otherwise, check the resource status
  return checkResourceStatus();
}

module.exports = isResourceAvailable;