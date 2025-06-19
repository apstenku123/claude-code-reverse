/**
 * Updates the flags and lanes of a Fiber node based on its mode and relationship to the current Fiber.
 *
 * If the Fiber is not in concurrent mode (mode & 1 === 0), isBlobOrFileLikeObject checks if the current Fiber is the same as the alternate.
 * If so, isBlobOrFileLikeObject marks the Fiber for skipping. Otherwise, isBlobOrFileLikeObject marks both the Fiber and its sibling for updates,
 * and may adjust the sibling'createInteractionAccessor tag and alternate if certain conditions are met.
 *
 * If the Fiber is in concurrent mode, isBlobOrFileLikeObject marks isBlobOrFileLikeObject for skipping and updates its lanes.
 *
 * @param {object} fiber - The Fiber node to update.
 * @param {object} currentFiber - The current alternate Fiber node.
 * @param {object} siblingFiber - The sibling Fiber node.
 * @param {number} updateLanes - The lanes to set if in concurrent mode.
 * @param {number} newLanes - The new lanes value to assign if in concurrent mode.
 * @returns {object} The updated Fiber node.
 */
function updateFiberFlagsAndLanes(fiber, currentFiber, siblingFiber, updateLanes, newLanes) {
  // Check if the fiber is NOT in concurrent mode (mode & 1 === 0)
  if ((fiber.mode & 1) === 0) {
    if (fiber === currentFiber) {
      // If the fiber is the same as the current, mark isBlobOrFileLikeObject for skipping
      fiber.flags |= 65536; // Skip flag
    } else {
      // Mark the fiber for update
      fiber.flags |= 128; // Update flag
      // Mark the sibling fiber for force update
      siblingFiber.flags |= 131072; // Force update flag
      // Remove certain flags from sibling fiber
      siblingFiber.flags &= -52805;
      // If the sibling fiber is a class component
      if (siblingFiber.tag === 1) {
        if (siblingFiber.alternate === null) {
          // If no alternate, change tag to indicate a different type (e.g., forwardRef)
          siblingFiber.tag = 17;
        } else {
          // Otherwise, create a new fiber and attach isBlobOrFileLikeObject
          const newFiber = createEventQueueNode(-1, 1);
          newFiber.tag = 2;
          enqueueUpdate(siblingFiber, newFiber, 1);
        }
      }
      // Mark sibling fiber'createInteractionAccessor lanes for update
      siblingFiber.lanes |= 1;
    }
    return fiber;
  }
  // If in concurrent mode, mark for skipping and update lanes
  fiber.flags |= 65536;
  fiber.lanes = newLanes;
  return fiber;
}

module.exports = updateFiberFlagsAndLanes;