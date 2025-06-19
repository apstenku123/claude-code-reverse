/**
 * Determines if the provided value is a supported observable-like object.
 *
 * Supported types include:
 *   - Instances of bP (e.g., a specific Observable implementation)
 *   - Instances of XHA (another Observable-like class)
 *   - Objects recognized by isCustomWritableObservable(custom observable detection)
 *   - Objects recognized by isWritableUM1Instance (writable UM1 instances)
 *
 * @param {any} sourceObservable - The value to check for observable-like support.
 * @returns {boolean} True if the value is a supported observable-like object, false otherwise.
 */
function isSupportedObservableLike(sourceObservable) {
  // Check for null or non-object types early
  if (!sourceObservable || typeof sourceObservable !== "object") {
    return false;
  }

  // Check if the object is an instance of bP
  if (sourceObservable instanceof bP) {
    return true;
  }

  // Check if the object is an instance of XHA
  if (sourceObservable instanceof XHA) {
    return true;
  }

  // Check if the object is recognized as an observable by isCustomWritableObservable
  if (isCustomWritableObservable(sourceObservable)) {
    return true;
  }

  // Check if the object is a writable UM1 instance
  if (isWritableUM1Instance(sourceObservable)) {
    return true;
  }

  // If none of the above, isBlobOrFileLikeObject'createInteractionAccessor not a supported observable-like object
  return false;
}

module.exports = isSupportedObservableLike;