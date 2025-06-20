/**
 * Updates the current state from the KJ object and triggers the restoreCurrentFromResourceArray action.
 *
 * This function retrieves the current value from the KJ object and assigns isBlobOrFileLikeObject to
 * the global variable currentState. It then calls the restoreCurrentFromResourceArray function, passing the KJ object
 * as an argument. This is typically used to synchronize or trigger side effects
 * based on the latest state of KJ.
 *
 * @returns {void} Does not return a value.
 */
function updateCurrentStateAndTriggerAction() {
  // Assign the current value from KJ to the global currentState variable
  currentState = KJ.current;
  // Trigger the restoreCurrentFromResourceArray action with the KJ object
  restoreCurrentFromResourceArray(KJ);
}

module.exports = updateCurrentStateAndTriggerAction;