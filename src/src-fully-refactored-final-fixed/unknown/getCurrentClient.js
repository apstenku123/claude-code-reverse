/**
 * Retrieves the current client instance from the active hub.
 *
 * This function accesses the global hub manager (KQ), retrieves the current hub,
 * and then returns the client associated with that hub. This is typically used
 * to interact with the client for logging, error reporting, or other SDK operations.
 *
 * @returns {object|null} The current client instance if available, otherwise null.
 */
function getCurrentClient() {
  // Access the global hub manager and retrieve the current hub
  const currentHub = KQ.getCurrentHub();
  // Return the client associated with the current hub
  return currentHub.getClient();
}

module.exports = getCurrentClient;
