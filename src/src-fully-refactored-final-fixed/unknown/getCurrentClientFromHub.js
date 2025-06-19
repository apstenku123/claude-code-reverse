/**
 * Retrieves the current client instance from the active hub.
 *
 * This function accesses the global hub manager (KQ), retrieves the current hub,
 * and then returns the client associated with that hub. Useful for accessing
 * the client configuration or methods in the current execution context.
 *
 * @returns {object|null} The current client instance if available, otherwise null.
 */
function getCurrentClientFromHub() {
  // Retrieve the current hub from the global hub manager
  const currentHub = KQ.getCurrentHub();
  // Return the client associated with the current hub
  return currentHub.getClient();
}

module.exports = getCurrentClientFromHub;