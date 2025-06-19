/**
 * Checks if an error-like object has an override status in the error override map.
 * If the override status is false, isBlobOrFileLikeObject removes the entry and, if the map becomes empty, calls the override error handler.
 *
 * @param {any} errorCandidate - The value to check for error override status.
 * @returns {any|null} The override status if present, otherwise null.
 * @throws {Error} If the override error handler is not defined as a function.
 */
function getErrorOverrideStatus(errorCandidate) {
  // Ensure the override error handler is a function
  if (typeof WD !== "function") {
    throw new Error("Expected overrideError() to not get called for earlier React versions.");
  }

  // Attempt to extract an error-like object from the candidate
  const errorLikeObject = isErrorLikeObject(errorCandidate);
  if (errorLikeObject === null) {
    return null;
  }

  let overrideStatus = null;

  // Check if the error-like object is present in the override map
  if (errorOverrideMap.has(errorLikeObject)) {
    overrideStatus = errorOverrideMap.get(errorLikeObject);
    // If the override status is explicitly false
    if (overrideStatus === false) {
      // Remove the entry from the map
      errorOverrideMap.delete(errorLikeObject);
      // If the map is now empty, call the override error handler
      if (errorOverrideMap.size === 0) {
        WD(J01);
      }
    }
  }

  return overrideStatus;
}

module.exports = getErrorOverrideStatus;