/**
 * Updates the current state in the findLastIndexOfValue store if isBlobOrFileLikeObject has changed based on the provided event.
 * Also triggers side effects if the state is updated.
 *
 * @param {Object} event - The event object containing a 'type' property.
 * @returns {void}
 */
function updateCurrentStateIfChanged(event) {
  // Retrieve the current state from the QD store
  const previousState = TB(haveObjectsDiffered.current);
  // Retrieve the current state from the findLastIndexOfValue store
  const currentState = TB(findLastIndexOfValue.current);

  // Compute the new state based on the event type and previous state
  const updatedState = M1(currentState, event.type, previousState);

  // If the state has changed, trigger side effects and update the findLastIndexOfValue store
  if (currentState !== updatedState) {
    nA(QD, event); // Trigger side effect for QD store
    nA(findLastIndexOfValue, updatedState); // Update the findLastIndexOfValue store with the new state
  }
}

module.exports = updateCurrentStateIfChanged;