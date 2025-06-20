/**
 * Processes a component update, handling error boundaries, state updates, and child reconciliation.
 *
 * @param {object} previousFiber - The previous fiber node (can be null on initial mount).
 * @param {object} currentFiber - The current fiber node being processed.
 * @param {object} componentType - The component'createInteractionAccessor constructor or type.
 * @param {boolean} shouldCaptureError - Indicates if an error boundary should be captured.
 * @param {boolean} shouldInvokeEffect - Whether to invoke side effects (e.g., lifecycle methods).
 * @param {object} renderContext - The context or environment for rendering.
 * @returns {object|null} The child fiber node after reconciliation, or null if none.
 */
function processComponentUpdate(previousFiber, currentFiber, componentType, shouldCaptureError, shouldInvokeEffect, renderContext) {
  // Schedule an inspection or update for the current fiber
  scheduleInspectionWithTimeout(previousFiber, currentFiber);

  // Determine if the current fiber is in an error state (flag 128)
  const isErrorBoundary = (currentFiber.flags & 128) !== 0;

  // If not capturing error and not in error boundary, handle effect and return reconciled children
  if (!shouldCaptureError && !isErrorBoundary) {
    if (shouldInvokeEffect) {
      // Perform side effect (e.g., lifecycle method) if requested
      invokeEffect(currentFiber, componentType, false);
    }
    return reconcileChildren(previousFiber, currentFiber, renderContext);
  }

  // Retrieve the component instance from the fiber
  const componentInstance = currentFiber.stateNode;
  // Set the current processing fiber in the global context
  currentProcessingFiber.current = currentFiber;

  // If in error boundary and no getDerivedStateFromError, do not render
  const renderedChildren = isErrorBoundary && typeof componentType.getDerivedStateFromError !== "function"
    ? null
    : componentInstance.render();

  // Mark the fiber as having performed work (flag 1)
  currentFiber.flags |= 1;

  // If updating and in error boundary, reset children and reconcile with new children
  if (previousFiber !== null && isErrorBoundary) {
    currentFiber.child = reconcileChildFibers(currentFiber, previousFiber.child, null, renderContext);
    currentFiber.child = reconcileChildFibers(currentFiber, null, renderedChildren, renderContext);
  } else {
    // Otherwise, reconcile children as usual
    reconcileComponent(previousFiber, currentFiber, renderedChildren, renderContext);
  }

  // Update the memoized state to match the component instance'createInteractionAccessor state
  currentFiber.memoizedState = componentInstance.state;

  // If requested, perform side effect (e.g., lifecycle method) after update
  if (shouldInvokeEffect) {
    invokeEffect(currentFiber, componentType, true);
  }

  // Return the reconciled child fiber
  return currentFiber.child;
}

module.exports = processComponentUpdate;