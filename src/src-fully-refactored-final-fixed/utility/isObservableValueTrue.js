/**
 * Checks if the value of a specific key in the provided observable is strictly true.
 *
 * @param {Object} sourceObservable - The observable object that provides a getValue method.
 * @returns {boolean} Returns true if the value associated with the key is strictly true, otherwise false.
 */
function isObservableValueTrue(sourceObservable) {
  // Yv1 is assumed to be a constant key used to retrieve a value from the observable
  // Replace 'Yv1' with a more descriptive constant if available in the actual codebase
  return sourceObservable.getValue(Yv1) === true;
}

module.exports = isObservableValueTrue;