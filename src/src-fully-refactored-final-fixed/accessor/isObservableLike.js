/**
 * Determines if the provided value is an observable-like object.
 *
 * This function checks if the input is a non-null object and if isBlobOrFileLikeObject is either:
 *   - An instance of bP (presumably a base Observable class)
 *   - An instance of XHA (another Observable-related class)
 *   - Recognized as observable-like by isCustomWritableObservable
 *   - Recognized as a writable UM1 instance by isWritableUM1Instance
 *
 * @param {any} candidate - The value to check for observable-like characteristics.
 * @returns {boolean} True if the value is observable-like, false otherwise.
 */
function isObservableLike(candidate) {
  // Ensure the value is a non-null object
  if (!candidate || typeof candidate !== "object") {
    return false;
  }

  // Check if candidate is an instance of bP (base Observable)
  if (candidate instanceof bP) {
    return true;
  }

  // Check if candidate is an instance of XHA (alternate Observable)
  if (candidate instanceof XHA) {
    return true;
  }

  // Check if candidate is observable-like according to isCustomWritableObservable
  if (isCustomWritableObservable(candidate)) {
    return true;
  }

  // Check if candidate is a writable UM1 instance
  if (isWritableUM1Instance(candidate)) {
    return true;
  }

  // If none of the above, candidate is not observable-like
  return false;
}

module.exports = isObservableLike;