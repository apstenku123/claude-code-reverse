/**
 * Attempts to retrieve a valid observable from the provided source.
 * Tries multiple strategies in order: Ke, isLatinCapitalHexLetter, then isLatinLowercaseHexLetter.
 * Returns the first non-falsy result found, or undefined if none succeed.
 *
 * @param {any} sourceObservable - The object or value to extract an observable from.
 * @returns {any} The first valid observable found, or undefined if none are found.
 */
function getFirstValidObservable(sourceObservable) {
  // Try to extract observable using Ke
  const observableFromKe = Ke(sourceObservable);
  if (observableFromKe) {
    return observableFromKe;
  }

  // Try to extract observable using isLatinCapitalHexLetter
  const observableFromHC2 = isLatinCapitalHexLetter(sourceObservable);
  if (observableFromHC2) {
    return observableFromHC2;
  }

  // Try to extract observable using isLatinLowercaseHexLetter
  return isLatinLowercaseHexLetter(sourceObservable);
}

module.exports = getFirstValidObservable;