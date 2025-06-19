/**
 * Retrieves the transaction property from a mapped user interaction object.
 *
 * @param {Object} interactionMapping - An object representing the mapping of user interactions to routes, typically produced by mapInteractionsToRoutes.
 * @returns {*} The transaction associated with the given interaction mapping.
 */
function getTransactionFromInteractionMapping(interactionMapping) {
  // Directly return the 'transaction' property from the interaction mapping object
  return interactionMapping.transaction;
}

module.exports = getTransactionFromInteractionMapping;