/**
 * Checks if the controller'createInteractionAccessor state is set to 'aborted'.
 *
 * @param {Object} sourceObject - The object containing a controller with a state property.
 * @param {Object} sourceObject.controller - The controller object.
 * @param {string} sourceObject.controller.state - The current state of the controller.
 * @returns {boolean} Returns true if the controller'createInteractionAccessor state is 'aborted', otherwise false.
 */
function isControllerAborted(sourceObject) {
  // Return true if the controller'createInteractionAccessor state is exactly 'aborted'
  return sourceObject.controller.state === "aborted";
}

module.exports = isControllerAborted;