/**
 * Resets the 'iterm2SetupInProgress' flag on the global application state and persists the change.
 *
 * This utility function retrieves the global application state object, sets the
 * 'iterm2SetupInProgress' property to false, and then persists the updated state
 * using the provided persistence function.
 *
 * @returns {void} This function does not return a value.
 */
function resetIterm2SetupFlag() {
  // Retrieve the global application state object
  const appState = getCachedOrFreshConfig();

  // Reset the iTerm2 setup progress flag
  appState.iterm2SetupInProgress = false;

  // Persist the updated application state
  updateProjectsAccessor(appState);
}

module.exports = resetIterm2SetupFlag;