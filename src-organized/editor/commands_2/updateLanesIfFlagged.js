/**
 * Updates the lanes of the target object if the provided laneFlags match a specific bitmask.
 *
 * @param {Object} root - The root object containing pendingLanes.
 * @param {Object} target - The target object whose lanes may be updated.
 * @param {number} laneFlags - Bitmask flags indicating which lanes to update.
 * @returns {void}
 *
 * If any of the bits in laneFlags match the mask 0x3FF000 (4194240),
 * this function merges the target'createInteractionAccessor lanes with the root'createInteractionAccessor pendingLanes,
 * updates the target'createInteractionAccessor lanes, and calls rZ with the updated lanes.
 */
function updateLanesIfFlagged(root, target, laneFlags) {
  // Check if any relevant bits are set in laneFlags (mask: 0x3FF000)
  if ((laneFlags & 0x3FF000) !== 0) {
    // Get the lanes from the target
    let targetLanes = target.lanes;
    // Mask the target'createInteractionAccessor lanes with the root'createInteractionAccessor pendingLanes
    targetLanes &= root.pendingLanes;
    // Merge the masked lanes into laneFlags
    laneFlags |= targetLanes;
    // Update the target'createInteractionAccessor lanes
    target.lanes = laneFlags;
    // Call the external function with the updated lanes
    rZ(root, laneFlags);
  }
}

module.exports = updateLanesIfFlagged;