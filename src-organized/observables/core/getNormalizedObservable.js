/**
 * Attempts to normalize the provided source into a standard observable format.
 * Tries multiple normalization strategies in order: copyArrayIfArray, toArrayIfIterable, 0-9A, and vG5.
 * Returns the first successful normalization result.
 *
 * @param {any} sourceObservable - The source to be normalized (could be an observable, iterable, array-like, etc.).
 * @returns {any} The normalized observable or the result of the first successful normalization strategy.
 */
function getNormalizedObservable(sourceObservable) {
  // Try to normalize using copyArrayIfArray strategy
  const resultFromYG5 = copyArrayIfArray(sourceObservable);
  if (resultFromYG5) {
    return resultFromYG5;
  }

  // Try to normalize using toArrayIfIterable strategy
  const resultFromXG5 = toArrayIfIterable(sourceObservable);
  if (resultFromXG5) {
    return resultFromXG5;
  }

  // Try to normalize using 0-9A (normalizeIterableInput)
  const resultFromNormalizeIterable = normalizeIterableOrArrayLike(sourceObservable);
  if (resultFromNormalizeIterable) {
    return resultFromNormalizeIterable;
  }

  // Fallback: use vG5 as the default normalization
  return vG5();
}

module.exports = getNormalizedObservable;