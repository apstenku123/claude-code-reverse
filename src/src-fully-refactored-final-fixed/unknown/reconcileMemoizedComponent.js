/**
 * Attempts to reconcile a memoized React component during the render phase.
 * Handles cases where the previous fiber is null (mount) or exists (update),
 * and determines whether to reuse the previous fiber or create a new one based on props and refs.
 *
 * @param {object|null} previousFiber - The previous fiber node, or null if mounting.
 * @param {object} workInProgressFiber - The work-in-progress fiber node being built.
 * @param {object} elementType - The React element type or memoized component definition.
 * @param {object} nextProps - The new props for the component.
 * @param {number} renderLanes - The lanes (priority) for this render.
 * @returns {object|null} The reconciled child fiber, or result of a bailout if possible.
 */
function reconcileMemoizedComponent(previousFiber, workInProgressFiber, elementType, nextProps, renderLanes) {
  // If there is no previous fiber, this is a mount
  if (previousFiber === null) {
    const componentType = elementType.type;
    // If the type is a function component and not a special React type, and has no defaultProps or compare
    if (
      typeof componentType === "function" &&
      !processWithDerivedValue(componentType) &&
      componentType.defaultProps === undefined &&
      elementType.compare === null &&
      elementType.defaultProps === undefined
    ) {
      // Treat as a simple function component
      workInProgressFiber.tag = 15; // FunctionComponent tag
      workInProgressFiber.type = componentType;
      return mountIndeterminateComponent(previousFiber, workInProgressFiber, componentType, nextProps, renderLanes);
    }
    // Otherwise, create a new fiber for the memoized component
    const newChildFiber = createFiberFromTypeAndProps(
      elementType.type,
      null,
      nextProps,
      workInProgressFiber,
      workInProgressFiber.mode,
      renderLanes
    );
    newChildFiber.ref = workInProgressFiber.ref;
    newChildFiber.return = workInProgressFiber;
    workInProgressFiber.child = newChildFiber;
    return newChildFiber;
  }

  // There is a previous fiber (update phase)
  const previousChildFiber = previousFiber.child;
  // If this fiber'createInteractionAccessor lanes do not overlap with current render lanes, handleMissingDoctypeError may be able to bail out
  if ((previousFiber.lanes & renderLanes) === 0) {
    const previousProps = previousChildFiber.memoizedProps;
    // Use custom compare function if provided, otherwise use default shallow comparison
    const compareFunction = elementType.compare !== null ? elementType.compare : findIndexWithDirection;
    // If props are equal and refs are unchanged, handleMissingDoctypeError can bail out
    if (compareFunction(previousProps, nextProps) && previousFiber.ref === workInProgressFiber.ref) {
      return bailoutOnAlreadyFinishedWork(previousFiber, workInProgressFiber, renderLanes);
    }
  }

  // Props or refs have changed, or handleMissingDoctypeError can'processRuleBeginHandlers bail out, so mark as needing update
  workInProgressFiber.flags |= 1; // Update flag
  const updatedChildFiber = cloneChildFiber(previousChildFiber, nextProps);
  updatedChildFiber.ref = workInProgressFiber.ref;
  updatedChildFiber.return = workInProgressFiber;
  workInProgressFiber.child = updatedChildFiber;
  return updatedChildFiber;
}

module.exports = reconcileMemoizedComponent;