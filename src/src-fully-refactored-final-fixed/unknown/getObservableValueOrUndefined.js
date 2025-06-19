/**
 * Retrieves the value from the provided observable using the specified key.
 * If the value is not present, returns undefined.
 *
 * @param {Object} sourceObservable - An object that exposes a getValue method.
 * @returns {any | undefined} The value associated with the key 'ff1', or undefined if not found.
 */
function getObservableValueOrUndefined(sourceObservable) {
  // Attempt to retrieve the value for the key 'ff1' from the observable
  // If the value is falsy (e.g., null, undefined, 0, ''), return undefined
  return sourceObservable.getValue(ff1) || undefined;
}

module.exports = getObservableValueOrUndefined;