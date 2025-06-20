/**
 * Resets the 'iterm2SetupInProgress' flag on the global application state object and persists the change.
 *
 * This function retrieves the current application state, sets the 'iterm2SetupInProgress'
 * property to false, and then saves the updated state using the provided persistence function.
 *
 * @returns {void} This function does not return a value.
 */
function resetIterm2SetupInProgress() {
  // Retrieve the current application state object
  const appState = getCachedOrFreshConfig();
  // Reset the 'iterm2SetupInProgress' flag to false
  appState.iterm2SetupInProgress = false;
  // Persist the updated application state
  updateProjectsAccessor(appState);
}

module.exports = resetIterm2SetupInProgress;