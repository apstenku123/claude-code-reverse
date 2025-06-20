/**
 * Reconciles the properties and lanes of a component during an update phase.
 * Determines if the component'createInteractionAccessor props and ref are unchanged, and if so, decides whether to reuse the previous fiber or proceed with a new render.
 *
 * @param {object|null} previousFiber - The previous fiber node, or null if this is a new mount.
 * @param {object} currentFiber - The current fiber node being processed.
 * @param {number} renderPriority - The current render priority (lanes).
 * @param {object} nextProps - The new props for the component.
 * @param {number} renderLanes - The lanes (priority levels) for this render pass.
 * @returns {object} The reconciled fiber node for this component.
 */
function reconcileComponentPropsAndLanes(previousFiber, currentFiber, renderPriority, nextProps, renderLanes) {
  // If there is a previous fiber (i.e., this is an update)
  if (previousFiber !== null) {
    const previousProps = previousFiber.memoizedProps;
    // Check if props are shallowly equal and refs are unchanged
    if (findIndexByPredicate(previousProps, nextProps) && previousFiber.ref === currentFiber.ref) {
      // Reset bailout flag (assumed global or closure variable)
      bailoutFlag = false;
      // Copy previous props to current fiber and update nextProps reference
      currentFiber.pendingProps = nextProps = previousProps;
      // If any of the lanes match the current render lanes
      if ((previousFiber.lanes & renderLanes) !== 0) {
        // If the fiber has the "force update" flag, set bailoutFlag to true
        if ((previousFiber.flags & 131072) !== 0) {
          bailoutFlag = true;
        }
      } else {
        // Otherwise, copy lanes and perform a fast bailout
        currentFiber.lanes = previousFiber.lanes;
        return performBailout(previousFiber, currentFiber, renderLanes);
      }
    }
  }
  // If not bailing out, proceed with normal reconciliation
  return performReconciliation(previousFiber, currentFiber, renderPriority, nextProps, renderLanes);
}

module.exports = reconcileComponentPropsAndLanes;