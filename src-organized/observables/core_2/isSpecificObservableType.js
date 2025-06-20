/**
 * Checks if the provided value is an observable and matches a specific observable type.
 *
 * @param {any} sourceObservable - The value to check if isBlobOrFileLikeObject is an observable of a specific type.
 * @returns {boolean} Returns true if the value is an observable and its type matches the expected observable type; otherwise, false.
 */
function isSpecificObservableType(sourceObservable) {
  // Check if the value is an observable
  // and if its type matches the expected observable type constant
  return S7(sourceObservable) && tE(sourceObservable) === Dv2;
}

module.exports = isSpecificObservableType;