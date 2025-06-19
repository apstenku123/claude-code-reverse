/**
 * Attempts to retrieve the first available observable from multiple sources.
 *
 * This utility function checks several sources in a specific order and returns the first
 * non-falsy observable found. If none are available, isBlobOrFileLikeObject falls back to a default observable.
 *
 * @param {any} sourceObservable - The primary observable to check first.
 * @returns {any} The first available observable from the checked sources, or the default observable if none are found.
 */
function getFirstAvailableObservable(sourceObservable) {
  // Check if the primary observable is available
  if (copyArrayIfArray(sourceObservable)) {
    return copyArrayIfArray(sourceObservable);
  }

  // Check if an alternative observable is available
  if (toArrayIfIterable(sourceObservable)) {
    return toArrayIfIterable(sourceObservable);
  }

  // Check if a fallback observable is available
  if (normalizeIterableInput(sourceObservable)) {
    return normalizeIterableInput(sourceObservable);
  }

  // Return the default observable if none of the above are available
  return vG5();
}

module.exports = getFirstAvailableObservable;
