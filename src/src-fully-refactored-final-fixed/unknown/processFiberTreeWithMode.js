/**
 * Traverses and processes a fiber tree, handling special mode and tag cases.
 * This function is likely part of a React-like reconciliation algorithm, where isBlobOrFileLikeObject walks the fiber tree,
 * processes nodes with a specific tag (22), and manages memoized state and alternate fibers.
 *
 * @param {object} rootFiber - The root fiber node to start processing from.
 * @param {any} updatePayload - The update payload or context passed through the tree.
 * @param {any} scheduler - The scheduler or context used during processing.
 * @returns {void}
 */
function processFiberTreeWithMode(rootFiber, updatePayload, scheduler) {
  // Determine if the root fiber is in a specific mode (bitwise check)
  const isSpecialMode = (rootFiber.mode & 1) !== 0;

  // applyFunctionToEntries is assumed to be a global or external variable representing the current fiber node
  while (applyFunctionToEntries !== null) {
    const currentFiber = applyFunctionToEntries;
    let childFiber = currentFiber.child;

    // Check for fiber with tag 22 and special mode
    if (currentFiber.tag === 22 && isSpecialMode) {
      // Determine if the current fiber or global scheduleNextExpirationCheck has memoized state
      const hasMemoizedState = currentFiber.memoizedState !== null || scheduleNextExpirationCheck;
      if (!hasMemoizedState) {
        // Check alternate fiber'createInteractionAccessor memoized state or global _B
        const alternateFiber = currentFiber.alternate;
        const alternateHasMemoizedState = (alternateFiber !== null && alternateFiber.memoizedState !== null) || _B;
        // Save previous global states
        const prev_C = scheduleNextExpirationCheck;
        const prev_B = _B;
        // Update global states for this context
        scheduleNextExpirationCheck = hasMemoizedState;
        _B = alternateHasMemoizedState;
        // If alternate has memoized state and previous _B was false, process all tag 22 children with memoized state
        if (_B && !prev_B) {
          for (applyFunctionToEntries = currentFiber; applyFunctionToEntries !== null;) {
            const fiberToCheck = applyFunctionToEntries;
            const fiberChild = fiberToCheck.child;
            if (fiberToCheck.tag === 22 && fiberToCheck.memoizedState !== null) {
              getProcessedValue(currentFiber); // External function call for special processing
            } else if (fiberChild !== null) {
              fiberChild.return = fiberToCheck;
              applyFunctionToEntries = fiberChild;
            } else {
              getProcessedValue(currentFiber);
            }
          }
        }
        // Recursively process all children
        while (childFiber !== null) {
          applyFunctionToEntries = childFiber;
          processFiberTreeWithMode(childFiber, updatePayload, scheduler);
          childFiber = childFiber.sibling;
        }
        // Restore previous global states
        applyFunctionToEntries = currentFiber;
        scheduleNextExpirationCheck = prev_C;
        _B = prev_B;
      }
      // Call external function for further processing
      getNestedPropertyByPath(rootFiber, updatePayload, scheduler);
    } else if ((currentFiber.subtreeFlags & 8772) !== 0 && childFiber !== null) {
      // If the subtree has specific flags and has a child, continue traversal
      childFiber.return = currentFiber;
      applyFunctionToEntries = childFiber;
    } else {
      // Otherwise, call external function for processing
      getNestedPropertyByPath(rootFiber, updatePayload, scheduler);
    }
  }
}

module.exports = processFiberTreeWithMode;