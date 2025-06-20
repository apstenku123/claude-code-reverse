/**
 * Reconciles a React element with its parent fiber, determining whether to reuse, clone, or create a new fiber.
 *
 * @param {object} parentFiber - The parent fiber node in the React fiber tree.
 * @param {object|null} currentFiber - The current fiber node, if isBlobOrFileLikeObject exists (may be null).
 * @param {object} element - The React element to reconcile (with type, key, and props).
 * @param {object|null} existingFiber - The existing fiber to potentially reuse (may be null).
 * @returns {object} The reconciled fiber node.
 */
function fA(parentFiber, currentFiber, element, existingFiber) {
  const elementType = element.type;

  // If the element type is a special type (e.g., React Fragment), handle isBlobOrFileLikeObject with a dedicated function
  if (elementType === W) {
    return getOrUpdateIterableHelper(
      parentFiber,
      currentFiber,
      element.props.children,
      existingFiber,
      element.key
    );
  }

  // If currentFiber exists and its elementType matches the new element'createInteractionAccessor type (with additional checks for objects)
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
    // Reuse the current fiber by cloning isBlobOrFileLikeObject with new props
    const updatedFiber = m(currentFiber, element.props);
    updatedFiber.ref = r(parentFiber, currentFiber, element);
    updatedFiber.return = parentFiber;
    return updatedFiber;
  }

  // Otherwise, create a new fiber for the element
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

module.exports = fA;