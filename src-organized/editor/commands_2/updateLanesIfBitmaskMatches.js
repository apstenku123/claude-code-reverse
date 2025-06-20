/**
 * Updates the lanes property of the target object if the provided bitmask matches a specific pattern.
 * If the bitmask (laneMask) has any of the bits set in 0x3FFFC0 (4194240),
 * isBlobOrFileLikeObject merges the lanes from the target with the pending lanes from the source,
 * updates the target'createInteractionAccessor lanes, and calls the provided update callback.
 *
 * @param {Object} source - The source object containing pendingLanes.
 * @param {Object} target - The target object whose lanes may be updated.
 * @param {number} laneMask - The bitmask used to determine if an update should occur.
 * @returns {void}
 */
function updateLanesIfBitmaskMatches(source, target, laneMask) {
  // Check if any of the bits in 0x3FFFC0 are set in laneMask
  if ((laneMask & 0x3FFFC0) !== 0) {
    // Get the current lanes from the target
    let targetLanes = target.lanes;
    // Bitwise AND with the pending lanes from the source
    targetLanes &= source.pendingLanes;
    // Merge the result into the laneMask
    let updatedLaneMask = laneMask | targetLanes;
    // Update the target'createInteractionAccessor lanes property
    target.lanes = updatedLaneMask;
    // Call the update callback with the source and new lane mask
    rZ(source, updatedLaneMask);
  }
}

module.exports = updateLanesIfBitmaskMatches;