/**
 * Traverses and processes a fiber tree, handling Suspense boundaries and updating state as needed.
 *
 * This function iterates through the fiber tree starting from the current global pointer (applyFunctionToEntries),
 * processes Suspense boundaries (tag 22), and invokes update or yield functions as appropriate.
 * It manages global state flags (scheduleNextExpirationCheck, _B) to track Suspense context and ensures correct traversal
 * of child and sibling fibers.
 *
 * @param {object} rootFiber - The root fiber node to start traversal from.
 * @param {any} updatePayload - The payload or context to pass to update functions.
 * @param {any} suspenseContext - The current Suspense context or state.
 * @returns {void}
 */
function traverseAndProcessFiberTree(rootFiber, updatePayload, suspenseContext) {
  // Determine if the root fiber is in concurrent mode
  const isConcurrentMode = (rootFiber.mode & 1) !== 0;

  // Continue traversal while there is a current fiber node (applyFunctionToEntries)
  while (applyFunctionToEntries !== null) {
    const currentFiber = applyFunctionToEntries;
    const childFiber = currentFiber.child;

    // Check if current fiber is a Suspense boundary (tag 22) and in concurrent mode
    if (currentFiber.tag === 22 && isConcurrentMode) {
      // Determine if this Suspense boundary is already in a fallback state or if global scheduleNextExpirationCheck is set
      const isSuspenseActive = currentFiber.memoizedState !== null || scheduleNextExpirationCheck;
      if (!isSuspenseActive) {
        // Check alternate fiber for fallback state or global _B
        const alternateFiber = currentFiber.alternate;
        const isAlternateSuspenseActive = (alternateFiber !== null && alternateFiber.memoizedState !== null) || _B;

        // Save previous global state
        const previous_C = scheduleNextExpirationCheck;
        const previous_B = _B;

        // Set global state for this Suspense boundary
        scheduleNextExpirationCheck = isSuspenseActive;
        _B = isAlternateSuspenseActive;

        // If Suspense is active and previous_B was false, traverse children and yield if needed
        if (_B && !previous_B) {
          for (applyFunctionToEntries = currentFiber; applyFunctionToEntries !== null;) {
            const suspenseFiber = applyFunctionToEntries;
            const suspenseChild = suspenseFiber.child;
            if (suspenseFiber.tag === 22 && suspenseFiber.memoizedState !== null) {
              // Yield control for this Suspense boundary
              getProcessedValue(currentFiber);
            } else if (suspenseChild !== null) {
              // Continue traversal to child
              suspenseChild.return = suspenseFiber;
              applyFunctionToEntries = suspenseChild;
            } else {
              // Yield control for this Suspense boundary
              getProcessedValue(currentFiber);
            }
          }
        }

        // Recursively process all children of the current Suspense boundary
        let child = childFiber;
        while (child !== null) {
          applyFunctionToEntries = child;
          traverseAndProcessFiberTree(child, updatePayload, suspenseContext);
          child = child.sibling;
        }

        // Restore global state
        applyFunctionToEntries = currentFiber;
        scheduleNextExpirationCheck = previous_C;
        _B = previous_B;
      }
      // Call the update/yield function for this Suspense boundary
      getNestedPropertyByPath(rootFiber, updatePayload, suspenseContext);
    } else if ((currentFiber.subtreeFlags & 8772) !== 0 && childFiber !== null) {
      // If the subtree has certain flags and has a child, continue traversal to child
      childFiber.return = currentFiber;
      applyFunctionToEntries = childFiber;
    } else {
      // Otherwise, call the update/yield function for this fiber
      getNestedPropertyByPath(rootFiber, updatePayload, suspenseContext);
    }
  }
}

module.exports = traverseAndProcessFiberTree;