/**
 * Returns the input as-is if isBlobOrFileLikeObject is an observable, otherwise splits the string by '.' and returns an array of segments.
 *
 * @param {string} sourceObservable - The string to check and potentially split.
 * @returns {string|string[]} The original observable string, or an array of string segments if not an observable.
 */
function splitDotNotationIfNotObservable(sourceObservable) {
  // Check if the input is an observable using the isArrayUtility utility function
  if (isArrayUtility(sourceObservable)) {
    return sourceObservable;
  }
  // If not an observable, split the string by '.' and return the array
  return sourceObservable.split(".");
}

module.exports = splitDotNotationIfNotObservable;