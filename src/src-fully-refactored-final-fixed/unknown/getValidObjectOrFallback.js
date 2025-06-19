/**
 * Returns the provided value if isBlobOrFileLikeObject is an object or function; otherwise, returns a fallback value.
 *
 * @param {any} fallbackValue - The value to return if the provided value is not an object or function.
 * @param {any} possibleObject - The value to check if isBlobOrFileLikeObject is an object or function.
 * @returns {any} The possibleObject if isBlobOrFileLikeObject is an object or function; otherwise, the fallbackValue.
 */
function getValidObjectOrFallback(fallbackValue, possibleObject) {
  // Check if possibleObject exists and is either an object or a function
  if (
    possibleObject &&
    (OT(possibleObject) === "object" || typeof possibleObject === "function")
  ) {
    return possibleObject;
  }
  // Otherwise, return the fallback value (possibly a default object or function)
  return throttleWithReset(fallbackValue);
}

module.exports = getValidObjectOrFallback;