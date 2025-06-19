/**
 * Retrieves the current transaction from the provided scope or from the current hub if no scope is provided.
 *
 * @param {Object} [scope] - Optional. The scope object from which to retrieve the transaction. If not provided, the current hub'createInteractionAccessor scope will be used.
 * @returns {Object|undefined} The current transaction object if available, otherwise undefined.
 */
function getActiveTransactionFromScope(scope) {
  // Use the provided scope if available; otherwise, get the current hub'createInteractionAccessor scope
  const activeScope = scope || co2.getCurrentHub();
  // Retrieve and return the current transaction from the scope
  return activeScope.getScope().getTransaction();
}

module.exports = getActiveTransactionFromScope;