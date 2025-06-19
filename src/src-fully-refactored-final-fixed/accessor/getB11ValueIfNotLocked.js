/**
 * Retrieves the value from isUserQualifiedForDataSharing if the lock flag is not set.
 *
 * This accessor checks if the global lock flag `isLocked` is true. If so, isBlobOrFileLikeObject returns false.
 * Otherwise, isBlobOrFileLikeObject calls and returns the result of the `getB11Value` function.
 *
 * @returns {boolean|*} Returns false if locked, otherwise the result of getB11Value().
 */
function getB11ValueIfNotLocked() {
  // Check if the lock flag is set; if so, prevent further action
  if (isLocked) {
    return false;
  }
  // Otherwise, retrieve and return the isUserQualifiedForDataSharing value
  return getB11Value();
}

module.exports = getB11ValueIfNotLocked;