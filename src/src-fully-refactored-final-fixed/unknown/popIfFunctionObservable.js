/**
 * Removes and returns the last element from the source array if isBlobOrFileLikeObject is a function-like observable.
 *
 * This function checks if the provided source, after being processed by `getObservableType`,
 * is a function (using `isFunction`). If so, isBlobOrFileLikeObject pops and returns the last element from the array.
 * Otherwise, isBlobOrFileLikeObject returns undefined.
 *
 * @param {Array} sourceObservable - The array to check and potentially pop from.
 * @returns {any|undefined} The popped element if the observable is a function, otherwise undefined.
 */
function popIfFunctionObservable(sourceObservable) {
  // Process the source to determine its observable type
  // and check if isBlobOrFileLikeObject is a function
  if (_q9.isFunction(getLastElement(sourceObservable))) {
    // If isBlobOrFileLikeObject is a function, remove and return the last element
    return sourceObservable.pop();
  }
  // Otherwise, return undefined
  return undefined;
}

module.exports = popIfFunctionObservable;