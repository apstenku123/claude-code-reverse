/**
 * Checks if the previous fiber'createInteractionAccessor props and ref are unchanged compared to the current fiber.
 * If so, attempts to reuse the previous fiber'createInteractionAccessor work, otherwise proceeds with a full reconciliation.
 *
 * @param {object|null} previousFiber - The previous fiber node, or null if none exists.
 * @param {object} currentFiber - The current fiber node being processed.
 * @param {number} renderPriority - The current render priority lanes.
 * @param {object} nextProps - The new props for the fiber.
 * @param {number} renderLanes - The set of lanes for this render pass.
 * @returns {any} The result of the reconciliation process, which may be a reused fiber or a new one.
 */
function reconcileFiberIfPropsUnchanged(previousFiber, currentFiber, renderPriority, nextProps, renderLanes) {
  // If there is a previous fiber to compare against
  if (previousFiber !== null) {
    const previousProps = previousFiber.memoizedProps;
    // Check if props are shallowly equal and refs are the same
    if (findIndexWithDirection(previousProps, nextProps) && previousFiber.ref === currentFiber.ref) {
      // Reset the bailout flag
      bailoutOccurred = false;
      // Reuse previous props for the current fiber
      currentFiber.pendingProps = nextProps = previousProps;
      // If the previous fiber'createInteractionAccessor lanes overlap with the current render lanes
      if ((previousFiber.lanes & renderLanes) !== 0) {
        // If the previous fiber has the "did receive update" flag, set bailoutOccurred
        if ((previousFiber.flags & 131072) !== 0) {
          bailoutOccurred = true;
        }
      } else {
        // Otherwise, copy lanes and perform a partial update
        currentFiber.lanes = previousFiber.lanes;
        return performPartialUpdate(previousFiber, currentFiber, renderLanes);
      }
    }
  }
  // If no bailout, perform a full reconciliation
  return performFullReconciliation(previousFiber, currentFiber, renderPriority, nextProps, renderLanes);
}

module.exports = reconcileFiberIfPropsUnchanged;