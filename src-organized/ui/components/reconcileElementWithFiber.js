/**
 * Reconciles a React element with an existing fiber node or creates a new fiber node if necessary.
 *
 * @param {object} parentFiber - The parent fiber node in the fiber tree.
 * @param {object|null} currentFiber - The current fiber node to reconcile against, or null if none exists.
 * @param {object} element - The React element to reconcile.
 * @param {object|null} existingFiber - The existing fiber node to reuse, or null if none exists.
 * @returns {object} The reconciled or newly created fiber node.
 */
function reconcileElementWithFiber(parentFiber, currentFiber, element, existingFiber) {
  const elementType = element.type;

  // If the element is a special type (e.g., React Fragment), handle with a dedicated function
  if (elementType === W) {
    return getOrUpdateIterableHelper(
      parentFiber,
      currentFiber,
      element.props.children,
      existingFiber,
      element.key
    );
  }

  // If the current fiber matches the element type, reuse the fiber with updated props
  if (
    currentFiber !== null &&
    (
      currentFiber.elementType === elementType ||
      (typeof elementType === "object" &&
        elementType !== null &&
        elementType.$$typeof === q &&
        initializeWithPayload(elementType) === currentFiber.type)
    )
  ) {
    // Update the existing fiber with new props
    const updatedFiber = m(currentFiber, element.props);
    updatedFiber.ref = r(parentFiber, currentFiber, element);
    updatedFiber.return = parentFiber;
    return updatedFiber;
  }

  // Otherwise, create a new fiber node for the element
  const newFiber = createReactElementNode(
    element.type,
    element.key,
    element.props,
    null,
    parentFiber.mode,
    existingFiber
  );
  newFiber.ref = r(parentFiber, currentFiber, element);
  newFiber.return = parentFiber;
  return newFiber;
}

module.exports = reconcileElementWithFiber;