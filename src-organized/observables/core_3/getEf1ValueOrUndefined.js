/**
 * Retrieves the value associated with the Ef1 key from the provided observable-like object.
 * If the value does not exist, returns undefined.
 *
 * @param {Object} sourceObservable - An object that provides a getValue method for retrieving stored values.
 * @returns {any} The value associated with the Ef1 key, or undefined if not present.
 */
function getEf1ValueOrUndefined(sourceObservable) {
  // Attempt to retrieve the value for the Ef1 key from the observable
  // If not found, return undefined
  return sourceObservable.getValue(Ef1) || undefined;
}

module.exports = getEf1ValueOrUndefined;