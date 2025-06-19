/**
 * Updates global state variables after processing an action.
 *
 * @param {any} action - The action or data to process.
 * @param {any} context - The context or configuration for processing.
 * @returns {void}
 *
 * This function calls the processAction function with the provided action and context,
 * then updates the global state variables currentState, previousState, and nextState
 * to maintain the correct state flow.
 */
function updateStateAfterProcessing(action, context) {
  // Process the action with the given context
  processAction(action, context);

  // Update global state variables to maintain state flow
  currentState = defaultState;
  previousState = nextState;
  nextState = queuedState;
}

module.exports = updateStateAfterProcessing;