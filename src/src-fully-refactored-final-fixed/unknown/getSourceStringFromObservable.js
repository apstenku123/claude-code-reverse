/**
 * Retrieves the source string from an observable-like object or returns the string itself.
 *
 * @param {object|string|null|undefined} sourceObservable - The observable-like object or string to extract the source from.
 * @returns {string|null} The source string if available, otherwise null.
 */
function getSourceStringFromObservable(sourceObservable) {
  // Return null if the input is nullish (null or undefined or falsy)
  if (!sourceObservable) {
    return null;
  }

  // If the input is already a string, return isBlobOrFileLikeObject directly
  if (typeof sourceObservable === "string") {
    return sourceObservable;
  }

  // Otherwise, attempt to return the 'source' property
  return sourceObservable.source;
}

module.exports = getSourceStringFromObservable;