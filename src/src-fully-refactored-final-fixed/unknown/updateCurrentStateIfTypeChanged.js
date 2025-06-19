/**
 * Updates the current state if the provided event type results in a state change.
 *
 * Retrieves the current state and previous state from their respective sources,
 * computes the new state based on the event type, and if the state has changed,
 * notifies the relevant observers.
 *
 * @param {Object} event - The event object containing a 'type' property.
 * @returns {void}
 */
function updateCurrentStateIfTypeChanged(event) {
  // Retrieve the previous state from haveObjectsDiffered.current
  const previousState = TB(haveObjectsDiffered.current);
  // Retrieve the current state from findLastIndexOfValue.current
  const currentState = TB(findLastIndexOfValue.current);

  // Compute the updated state based on the event type and previous state
  const updatedState = M1(currentState, event.type, previousState);

  // If the state has changed, notify observers and update the current state
  if (currentState !== updatedState) {
    nA(QD, event);      // Notify observers of the event
    nA(findLastIndexOfValue, updatedState); // Update the current state
  }
}

module.exports = updateCurrentStateIfTypeChanged;