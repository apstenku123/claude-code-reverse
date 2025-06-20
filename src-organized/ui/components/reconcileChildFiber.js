/**
 * Reconciles a child fiber node based on the current and new element descriptions.
 * Handles the creation, update, or bailout of a fiber node depending on its type and props.
 *
 * @param {object|null} currentChildFiber - The current child fiber node, or null if this is a new mount.
 * @param {object} workInProgressFiber - The work-in-progress fiber node being built.
 * @param {object} elementTypeDescriptor - The element type descriptor (may include type, compare, defaultProps, etc).
 * @param {object} newProps - The new props for the child element.
 * @param {number} renderLanes - The lanes (priority) for this render pass.
 * @returns {object} The reconciled child fiber node.
 */
function reconcileChildFiber(currentChildFiber, workInProgressFiber, elementTypeDescriptor, newProps, renderLanes) {
  // If there is no current child fiber, handleMissingDoctypeError are mounting a new child
  if (currentChildFiber === null) {
    const elementType = elementTypeDescriptor.type;
    // If the type is a function component with no defaultProps and no custom compare, treat as a simple function component
    if (
      typeof elementType === "function" &&
      !Gq(elementType) &&
      elementType.defaultProps === undefined &&
      elementTypeDescriptor.compare === null &&
      elementTypeDescriptor.defaultProps === undefined
    ) {
      workInProgressFiber.tag = 15; // Tag for function component
      workInProgressFiber.type = elementType;
      return reconcileComponentPropsAndLanes(currentChildFiber, workInProgressFiber, elementType, newProps, renderLanes);
    }
    // Otherwise, create a new fiber for the element type
    const newChildFiber = createReactElementNode(
      elementTypeDescriptor.type,
      null,
      newProps,
      workInProgressFiber,
      workInProgressFiber.mode,
      renderLanes
    );
    newChildFiber.ref = workInProgressFiber.ref;
    newChildFiber.return = workInProgressFiber;
    workInProgressFiber.child = newChildFiber;
    return newChildFiber;
  }

  // If the current child fiber exists, check if handleMissingDoctypeError can bail out (skip update)
  const previousChild = currentChildFiber.child;
  // If the current fiber'createInteractionAccessor lanes do not overlap with the current render lanes, handleMissingDoctypeError may be able to bail out
  if ((currentChildFiber.lanes & renderLanes) === 0) {
    const previousProps = previousChild.memoizedProps;
    // Use custom compare function if provided, otherwise use default (findIndexByPredicate)
    const compareFunction = elementTypeDescriptor.compare !== null ? elementTypeDescriptor.compare : findIndexByPredicate;
    // If props are equal and refs are unchanged, handleMissingDoctypeError can bail out
    if (compareFunction(previousProps, newProps) && currentChildFiber.ref === workInProgressFiber.ref) {
      return getTypeOfValue(currentChildFiber, workInProgressFiber, renderLanes);
    }
  }

  // Otherwise, mark the fiber for update and create a new child fiber
  workInProgressFiber.flags |= 1; // Mark for update
  const updatedChildFiber = createAccessorFunctionProxy(previousChild, newProps);
  updatedChildFiber.ref = workInProgressFiber.ref;
  updatedChildFiber.return = workInProgressFiber;
  workInProgressFiber.child = updatedChildFiber;
  return updatedChildFiber;
}

module.exports = reconcileChildFiber;