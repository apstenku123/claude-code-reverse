/**
 * Checks whether the controller'createInteractionAccessor state is either 'aborted' or 'terminated'.
 *
 * @param {Object} interactionEntry - The interaction entry object containing a controller property.
 * @param {Object} interactionEntry.controller - The controller object with a state property.
 * @param {string} interactionEntry.controller.state - The current state of the controller.
 * @returns {boolean} True if the controller'createInteractionAccessor state is 'aborted' or 'terminated', otherwise false.
 */
function isControllerAbortedOrTerminated(interactionEntry) {
  // Check if the controller'createInteractionAccessor state is either 'aborted' or 'terminated'
  return (
    interactionEntry.controller.state === "aborted" ||
    interactionEntry.controller.state === "terminated"
  );
}

module.exports = isControllerAbortedOrTerminated;