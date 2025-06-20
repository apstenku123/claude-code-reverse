/**
 * Attempts to normalize the provided input into a standard observable or iterable format.
 * Tries multiple normalization strategies in order: copyArrayIfArray, toArrayIfIterable, normalizeIterableInput, and finally vG5 as a fallback.
 *
 * @param {*} sourceObservable - The input to be normalized. Can be an observable, iterable, or array-like object.
 * @returns {*} - The normalized observable or iterable, or the result of the fallback normalization.
 */
function getNormalizedObservableInput(sourceObservable) {
  // Try to normalize using copyArrayIfArray(e.g., checks for RxJS Observable or similar)
  if (copyArrayIfArray(sourceObservable)) {
    return copyArrayIfArray(sourceObservable);
  }
  // Try to normalize using toArrayIfIterable(e.g., checks for Promises or similar)
  if (toArrayIfIterable(sourceObservable)) {
    return toArrayIfIterable(sourceObservable);
  }
  // Try to normalize using normalizeIterableInput(e.g., handles iterable or array-like inputs)
  if (normalizeIterableInput(sourceObservable)) {
    return normalizeIterableInput(sourceObservable);
  }
  // Fallback normalization if none of the above matched
  return vG5();
}

module.exports = getNormalizedObservableInput;