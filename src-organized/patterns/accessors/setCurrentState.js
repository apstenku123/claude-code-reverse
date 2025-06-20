/**
 * Updates the global application state based on the provided new state value.
 *
 * If the new state is null, resets related global state variables to their default values.
 * Always sets the currentState to the provided value.
 *
 * @param {*} newState - The new state value to set as the current state. Can be any type.
 * @returns {void}
 */
function setCurrentState(newState) {
  // If the new state is null, reset related global state variables
  if (newState === null) {
    globalDataCache = null;
    maxTimeout = -1;
    isLoading = false;
  }
  // Set the current state to the provided value
  currentState = newState;
}

module.exports = setCurrentState;