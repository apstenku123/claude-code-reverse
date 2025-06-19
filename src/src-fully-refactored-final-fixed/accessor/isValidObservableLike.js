/**
 * Determines if the provided value is a valid observable-like object.
 *
 * This function checks if the value is a non-null object and if isBlobOrFileLikeObject is an instance of
 * either the bP or XHA classes, or if isBlobOrFileLikeObject satisfies the isCustomWritableObservable or isWritableUM1Instance checks.
 *
 * @param {any} sourceObservable - The value to check for observable-like characteristics.
 * @returns {boolean} True if the value is observable-like, otherwise false.
 */
function isValidObservableLike(sourceObservable) {
  // Ensure the value is a non-null object
  if (!sourceObservable || typeof sourceObservable !== "object") {
    return false;
  }

  // Check if the value is an instance of bP
  if (sourceObservable instanceof bP) {
    return true;
  }

  // Check if the value is an instance of XHA
  if (sourceObservable instanceof XHA) {
    return true;
  }

  // Check if the value satisfies the isCustomWritableObservable observable-like check
  if (isCustomWritableObservable(sourceObservable)) {
    return true;
  }

  // Check if the value is a writable UM1 instance
  if (isWritableUM1Instance(sourceObservable)) {
    return true;
  }

  // If none of the above, return false
  return false;
}

module.exports = isValidObservableLike;