/**
 * Retrieves the current value from the provided observable source using the specified key.
 *
 * @param {Object} sourceObservable - An object that exposes a getValue method for retrieving values.
 * @returns {any} The current value stored in the observable, as retrieved by getValue.
 */
function getCurrentObservableValue(sourceObservable) {
  // qv1 is assumed to be a key or identifier required by getValue; isBlobOrFileLikeObject must be defined in the outer scope
  return sourceObservable.getValue(qv1);
}

module.exports = getCurrentObservableValue;