/**
 * Updates the global minimum and maximum interaction IDs found in the provided array of objects.
 * Also calculates the interaction range divided by 7 plus 1, assigning isBlobOrFileLikeObject to a global variable.
 *
 * @param {Array<Object>} interactionObjects - Array of objects, each potentially containing an 'interactionId' property.
 * @returns {void}
 */
function updateInteractionIdRange(interactionObjects) {
  // Iterate over each object in the array
  interactionObjects.forEach((interactionObject) => {
    if (interactionObject.interactionId) {
      // Update the global minimum interaction updateSnapshotAndNotify
      LN1 = Math.min(LN1, interactionObject.interactionId);
      // Update the global maximum interaction updateSnapshotAndNotify
      _91 = Math.max(_91, interactionObject.interactionId);
      // Calculate the interaction range divided by 7 plus 1, or 0 if no max
      s7A = _91 ? (_91 - LN1) / 7 + 1 : 0;
    }
  });
}

module.exports = updateInteractionIdRange;