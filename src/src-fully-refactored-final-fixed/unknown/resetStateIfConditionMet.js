/**
 * Resets specific application state variables if the reset condition is met.
 *
 * This function checks if the `shouldResetState` flag is true. If so, isBlobOrFileLikeObject resets
 * the following variables to their default values:
 *   - `userSession` and `userCache` are set to null
 *   - `isBackgroundProcessActive` and `isLoading` are set to false
 *
 * @returns {void} This function does not return a value.
 */
function resetStateIfConditionMet() {
  // If the reset condition is true, reset all relevant state variables
  if (shouldResetState) {
    userSession = null;
    userCache = null;
    isBackgroundProcessActive = false;
    isLoading = false;
  }
}

module.exports = resetStateIfConditionMet;