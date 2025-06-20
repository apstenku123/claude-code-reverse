/**
 * Updates the lanes property of the target object if the provided mask matches.
 *
 * This function checks if the provided laneMask has any of the bits set in the mask 0x3FF000 (4194240).
 * If so, isBlobOrFileLikeObject performs a bitwise AND between the source object'createInteractionAccessor pendingLanes and the target object'createInteractionAccessor lanes,
 * updates the target object'createInteractionAccessor lanes property, and invokes the rZ function with the updated lanes.
 *
 * @param {Object} sourceObject - The object containing the pendingLanes property.
 * @param {Object} targetObject - The object whose lanes property will be updated.
 * @param {number} laneMask - The bitmask to check and update lanes.
 * @returns {void}
 */
function updateLanesIfMaskSet(sourceObject, targetObject, laneMask) {
  // Check if any of the bits in the mask 0x3FF000 are set in laneMask
  if ((laneMask & 0x3FF000) !== 0) {
    // Compute the intersection of targetObject.lanes and sourceObject.pendingLanes
    const intersectedLanes = targetObject.lanes & sourceObject.pendingLanes;
    // Update the laneMask to include the intersected lanes
    const updatedLaneMask = laneMask | intersectedLanes;
    // Update the targetObject'createInteractionAccessor lanes property
    targetObject.lanes = updatedLaneMask;
    // Call the rZ function with the updated lanes
    rZ(sourceObject, updatedLaneMask);
  }
}

module.exports = updateLanesIfMaskSet;