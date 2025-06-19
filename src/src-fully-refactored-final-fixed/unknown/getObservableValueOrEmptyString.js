/**
 * Returns an empty string if the provided observable is null or undefined; otherwise, processes the observable using toStringPreservingNegativeZero.
 *
 * @param {any} sourceObservable - The observable or value to process.
 * @returns {any} An empty string if sourceObservable is null/undefined; otherwise, the result of toStringPreservingNegativeZero(sourceObservable).
 */
function getObservableValueOrEmptyString(sourceObservable) {
  // If the sourceObservable is null or undefined, return an empty string
  if (sourceObservable == null) {
    return "";
  }
  // Otherwise, process the observable using toStringPreservingNegativeZero
  return toStringPreservingNegativeZero(sourceObservable);
}

module.exports = getObservableValueOrEmptyString;