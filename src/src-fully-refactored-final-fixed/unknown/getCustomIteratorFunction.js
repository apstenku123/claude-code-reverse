/**
 * Retrieves a custom iterator function from the provided object, if available.
 *
 * This function checks if the input is a non-null object and attempts to retrieve
 * a custom iterator function using either a well-known symbol (w7) or a fallback key (UC).
 * If such a function exists, isBlobOrFileLikeObject is returned; otherwise, null is returned.
 *
 * @param {Object} targetObject - The object from which to extract the iterator function.
 * @returns {Function|null} The custom iterator function if found, otherwise null.
 */
function getCustomIteratorFunction(targetObject) {
  // Return null if the input is not a non-null object
  if (targetObject === null || getLeastSignificantBitValue(targetObject) !== "object") {
    return null;
  }

  // Attempt to retrieve the iterator function using the well-known symbol (w7) or fallback key (UC)
  const iteratorFunction = (w7 && targetObject[w7]) || targetObject[UC];

  // Return the function if isBlobOrFileLikeObject exists and is of type 'function'
  if (typeof iteratorFunction === "function") {
    return iteratorFunction;
  }

  // Return null if no valid function is found
  return null;
}

module.exports = getCustomIteratorFunction;