/**
 * Determines whether a React Fiber node can be reused or needs to be cloned based on props, refs, and lanes.
 *
 * @param {object|null} currentFiber - The current Fiber node (may be null if this is a new mount).
 * @param {object} workInProgressFiber - The work-in-progress Fiber node being processed.
 * @param {number} renderLanes - The lanes (priority levels) for the current render.
 * @param {object} nextProps - The new props for the Fiber node.
 * @param {number} renderPriority - The priority mask for the current render.
 * @returns {object} The resulting Fiber node, either reused or cloned as needed.
 */
function shouldReuseOrCloneFiberNode(currentFiber, workInProgressFiber, renderLanes, nextProps, renderPriority) {
  // If there is a current Fiber node, check if handleMissingDoctypeError can reuse isBlobOrFileLikeObject
  if (currentFiber !== null) {
    const previousProps = currentFiber.memoizedProps;
    // Check if the previous props match the next props and refs are equal
    if (findIndexByPredicate(previousProps, nextProps) && currentFiber.ref === workInProgressFiber.ref) {
      // Reset the bailout flag (assumed global or closure variable)
      bailoutOccurred = false;
      // Reuse the previous props
      workInProgressFiber.pendingProps = nextProps = previousProps;
      // If the current Fiber'createInteractionAccessor lanes overlap with the render priority
      if ((currentFiber.lanes & renderPriority) !== 0) {
        // If the Fiber was previously bailed out, set the bailout flag
        if ((currentFiber.flags & 131072) !== 0) {
          bailoutOccurred = true;
        }
      } else {
        // If lanes do not overlap, copy lanes and perform a shallow clone
        workInProgressFiber.lanes = currentFiber.lanes;
        return cloneFiberNode(currentFiber, workInProgressFiber, renderPriority);
      }
    }
  }
  // If handleMissingDoctypeError can'processRuleBeginHandlers reuse, perform a full reconciliation
  return reconcileFiberNode(currentFiber, workInProgressFiber, renderLanes, nextProps, renderPriority);
}

module.exports = shouldReuseOrCloneFiberNode;