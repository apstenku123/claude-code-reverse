/**
 * Traverses a Fiber tree and applies updates to DOM nodes or continues traversal as needed.
 *
 * @param {Object} fiberNode - The current Fiber node being processed.
 * @param {any} updatePayload - The update payload or context to apply.
 * @param {any} rootContainer - The root container DOM node or context.
 * @returns {void}
 *
 * If the fiberNode represents a host component (tag 5) or text node (tag 6),
 * isBlobOrFileLikeObject applies updates to the corresponding DOM node using G2 or U2.
 * Otherwise, isBlobOrFileLikeObject recursively traverses the child and sibling fibers.
 */
function traverseFiberAndApplyUpdate(fiberNode, updatePayload, rootContainer) {
  const fiberTag = fiberNode.tag;

  // If the node is a host component (5) or text node (6), update its DOM node
  if (fiberTag === 5 || fiberTag === 6) {
    const domNode = fiberNode.stateNode;
    if (updatePayload) {
      // Apply update with payload
      G2(rootContainer, domNode, updatePayload);
    } else {
      // Apply update without payload
      U2(rootContainer, domNode);
    }
  } else if (fiberTag !== 4) {
    // If not a portal (tag 4), recursively process children
    let childFiber = fiberNode.child;
    if (childFiber !== null) {
      // Traverse the child subtree
      traverseFiberAndApplyUpdate(childFiber, updatePayload, rootContainer);
      // Traverse siblings
      let siblingFiber = childFiber.sibling;
      while (siblingFiber !== null) {
        traverseFiberAndApplyUpdate(siblingFiber, updatePayload, rootContainer);
        siblingFiber = siblingFiber.sibling;
      }
    }
  }
}

module.exports = traverseFiberAndApplyUpdate;