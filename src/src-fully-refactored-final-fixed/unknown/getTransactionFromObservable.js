/**
 * Retrieves the 'transaction' property from the provided observable object.
 *
 * @param {Object} sourceObservable - The observable object containing a 'transaction' property.
 * @returns {*} The value of the 'transaction' property from the observable object.
 */
function getTransactionFromObservable(sourceObservable) {
  // Return the 'transaction' property from the observable object
  return sourceObservable.transaction;
}

module.exports = getTransactionFromObservable;