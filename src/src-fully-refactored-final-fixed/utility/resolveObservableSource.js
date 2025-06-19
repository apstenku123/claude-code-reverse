/**
 * Attempts to resolve and normalize an observable source using multiple strategies.
 *
 * Tries each normalization strategy in order: copyArrayIfArray, toArrayIfIterable, 0-9A, and vG5.
 * Returns the first successful result, or the result of vG5 if all others fail.
 *
 * @param {any} sourceObservable - The source to be normalized (could be an observable, iterable, array-like, etc.)
 * @returns {any} The normalized observable source, or the result of the fallback strategy.
 */
function resolveObservableSource(sourceObservable) {
  // Try to normalize using copyArrayIfArray strategy
  const normalizedByYG5 = copyArrayIfArray(sourceObservable);
  if (normalizedByYG5) {
    return normalizedByYG5;
  }

  // Try to normalize using toArrayIfIterable strategy
  const normalizedByXG5 = toArrayIfIterable(sourceObservable);
  if (normalizedByXG5) {
    return normalizedByXG5;
  }

  // Try to normalize using 0-9A strategy
  const normalizedByIterable = normalizeIterableOrArrayLike(sourceObservable);
  if (normalizedByIterable) {
    return normalizedByIterable;
  }

  // Fallback: use vG5 strategy
  return vG5();
}

module.exports = resolveObservableSource;