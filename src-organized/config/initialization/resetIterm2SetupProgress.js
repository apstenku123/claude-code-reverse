/**
 * Resets the iTerm2 setup progress flag in the application state.
 *
 * This utility function retrieves the current application state object,
 * sets the `iterm2SetupInProgress` property to false, and then persists
 * or updates the state using the provided persistence function.
 *
 * @returns {void} This function does not return a value.
 */
function resetIterm2SetupProgress() {
  // Retrieve the current application state object
  const appState = getCachedOrFreshConfig();

  // Mark that iTerm2 setup is no longer in progress
  appState.iterm2SetupInProgress = false;

  // Persist or update the application state
  updateProjectsAccessor(appState);
}

module.exports = resetIterm2SetupProgress;