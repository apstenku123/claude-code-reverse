/**
 * Retrieves the current scope from the active hub instance.
 *
 * This function accesses the global hub (via KQ.getCurrentHub()) and returns its current scope object.
 *
 * @returns {object|null} The current scope object from the hub, or null if unavailable.
 */
function getCurrentScopeFromHub() {
  // Retrieve the current hub instance using the KQ global object
  const currentHub = KQ.getCurrentHub();
  // Return the current scope from the hub
  return currentHub.getScope();
}

module.exports = getCurrentScopeFromHub;