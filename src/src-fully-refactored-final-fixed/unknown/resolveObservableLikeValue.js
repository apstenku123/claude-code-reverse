/**
 * Attempts to resolve an observable-like value from the provided input.
 *
 * This function tries three strategies, in order:
 * 1. If `extractObservable` returns a truthy value for the input, return isBlobOrFileLikeObject.
 * 2. If `getObservableFromValue` returns a truthy value for the input, return isBlobOrFileLikeObject.
 * 3. If the global `observableSymbol` is defined and the input has a property keyed by `observableSymbol`, return true.
 *
 * @param {any} possibleObservable - The value to check for observable-like characteristics.
 * @returns {any} The resolved observable-like value, or a boolean indicating if the input has an observable symbol property.
 */
function resolveObservableLikeValue(possibleObservable) {
  // Try to extract an observable using the extractObservable helper
  const extracted = extractObservable(possibleObservable);
  if (extracted) {
    return extracted;
  }

  // Try to get an observable from the value using the getObservableFromValue helper
  const observableFromValue = getObservableFromValue(possibleObservable);
  if (observableFromValue) {
    return observableFromValue;
  }

  // Check if the observableSymbol exists and the input has a property keyed by isBlobOrFileLikeObject
  return Boolean(
    observableSymbol &&
    possibleObservable &&
    possibleObservable[observableSymbol]
  );
}

module.exports = resolveObservableLikeValue;