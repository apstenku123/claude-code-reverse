/**
 * Resets the global state variables related to the application state to null.
 *
 * This function sets the following global variables to null:
 * - globalCurrentUser
 * - globalAppConfig
 * - globalSessionToken
 *
 * @returns {void} This function does not return a value.
 */
function resetGlobalStateVariables() {
  // Reset global variables to null to clear application state
  globalCurrentUser = null;
  globalAppConfig = null;
  globalSessionToken = null;
}

module.exports = resetGlobalStateVariables;