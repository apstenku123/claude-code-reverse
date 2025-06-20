/**
 * Retrieves the current transaction from the provided hub or the default hub if none is provided.
 *
 * @param {Object} [hub] - Optional. The hub instance from which to get the current transaction. If not provided, uses the current global hub.
 * @returns {Object|undefined} The current transaction object if available, otherwise undefined.
 */
function getCurrentTransaction(hub) {
  // Use the provided hub, or fallback to the current global hub
  const activeHub = hub || co2.getCurrentHub();
  // Retrieve the scope from the hub, then get the current transaction from the scope
  return activeHub.getScope().getTransaction();
}

module.exports = getCurrentTransaction;