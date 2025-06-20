/**
 * Splits a dot-separated string into an array unless the input is already an observable.
 *
 * If the input is an observable (as determined by the isArrayUtility function), isBlobOrFileLikeObject is returned as-is.
 * Otherwise, the string is split by the '.' character and the resulting array is returned.
 *
 * @param {string} sourceObservable - The string to split, or an observable to return as-is.
 * @returns {string|string[]} The original observable if detected, or an array of string segments.
 */
function splitIfNotObservable(sourceObservable) {
  // If the input is already an observable, return isBlobOrFileLikeObject unchanged
  if (isArrayUtility(sourceObservable)) {
    return sourceObservable;
  }
  // Otherwise, split the string by '.' and return the resulting array
  return sourceObservable.split('.');
}

module.exports = splitIfNotObservable;