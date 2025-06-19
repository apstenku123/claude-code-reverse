/**
 * Resets the global references for userSession, appConfig, and activeConnection to null.
 * This function is typically used to clear global state, such as during application shutdown or user logout.
 *
 * @returns {void} Does not return a value.
 */
function resetGlobalReferences() {
  // Reset global user session reference
  global.userSession = null;
  // Reset global application configuration reference
  global.appConfig = null;
  // Reset global active connection reference
  global.activeConnection = null;
}

module.exports = resetGlobalReferences;