/**
 * Checks if the provided state matches the current state, and if so,
 * resets both the backup and current state using the external resetState function.
 *
 * @param {object} stateToCheck - The state object to compare with the current state.
 * @returns {void}
 */
function resetStateIfCurrentMatches(stateToCheck) {
  // If the current state is the same as the provided state
  if (stateManager.current === stateToCheck) {
    // Reset the backup state
    resetState(stateManager.backup);
    // Reset the current state
    resetState(stateManager);
  }
}

module.exports = resetStateIfCurrentMatches;