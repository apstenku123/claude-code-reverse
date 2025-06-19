/**
 * Returns the provided observable if isBlobOrFileLikeObject exists; otherwise, returns an empty observable.
 *
 * @param {any} sourceObservable - The observable to check and return if defined.
 * @returns {any} The provided observable if isBlobOrFileLikeObject exists, otherwise an empty observable.
 */
function getObservableOrEmpty(sourceObservable) {
  // If the source observable is defined, return its processed version
  if (sourceObservable) {
    return Tq9(sourceObservable);
  }
  // Otherwise, return the EMPTY observable
  return _wA.EMPTY;
}

module.exports = getObservableOrEmpty;