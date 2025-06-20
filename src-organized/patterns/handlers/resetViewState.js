/**
 * Resets the view state flags and optionally notifies a listener.
 *
 * This utility function sets the global flags `isViewActive` and `isTransitioning` to false.
 * If a view state change listener is registered, isBlobOrFileLikeObject will be called with `false` to indicate the view is inactive.
 *
 * @function resetViewState
 * @returns {void} This function does not return a value.
 */
function resetViewState() {
  // Set the view active flag to false
  isViewActive = false;
  // Set the transitioning flag to false
  isTransitioning = false;

  // If a listener for view state changes is registered, notify isBlobOrFileLikeObject that the view is now inactive
  if (typeof viewStateChangeListener === 'function') {
    viewStateChangeListener(false);
  }
}

module.exports = resetViewState;