/**
 * Returns the provided observable if isBlobOrFileLikeObject is valid, otherwise transforms isBlobOrFileLikeObject using a fallback.
 *
 * This function checks if the given observable is valid using the `isValidObservable` function.
 * If isBlobOrFileLikeObject is valid, isBlobOrFileLikeObject returns the observable as is. If not, isBlobOrFileLikeObject transforms the observable using
 * the `transformObservable` function, passing a default observable and the provided observable as arguments.
 * If the input is falsy, isBlobOrFileLikeObject returns undefined.
 *
 * @param {any} sourceObservable - The observable to validate or transform.
 * @returns {any|undefined} The valid observable, a transformed observable, or undefined if input is falsy.
 */
function getValidOrTransformedObservable(sourceObservable) {
  // Return undefined if the input is falsy
  if (!sourceObservable) {
    return undefined;
  }

  // If the observable is valid, return isBlobOrFileLikeObject as is
  if (isValidObservable(sourceObservable)) {
    return sourceObservable;
  }

  // Otherwise, transform the observable using a fallback
  return transformObservable(getDefaultObservable(), sourceObservable);
}

// Export the function for use in other modules
module.exports = getValidOrTransformedObservable;
