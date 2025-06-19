/**
 * Retrieves the transaction associated with a given interaction entry object.
 *
 * @param {Object} interactionEntry - An object representing an interaction entry, expected to contain a 'transaction' property.
 * @returns {*} The transaction value from the interaction entry object.
 */
function getTransactionFromInteractionEntry(interactionEntry) {
  // Return the transaction property from the interaction entry object
  return interactionEntry.transaction;
}

module.exports = getTransactionFromInteractionEntry;