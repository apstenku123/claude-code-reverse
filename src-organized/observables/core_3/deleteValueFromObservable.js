/**
 * Deletes a specific value from the provided observable-like object.
 *
 * @param {Object} observableSource - The object that exposes a deleteValue method.
 * @returns {*} The result of the deleteValue operation, as returned by the observableSource.
 */
function deleteValueFromObservable(observableSource) {
  // ff1 is assumed to be a globally defined value to delete from the observableSource
  return observableSource.deleteValue(ff1);
}

module.exports = deleteValueFromObservable;