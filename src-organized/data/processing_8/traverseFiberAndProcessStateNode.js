/**
 * Traverses a Fiber tree and processes state nodes based on their tag type.
 *
 * For Fiber nodes with tag 5 or 6, isBlobOrFileLikeObject processes the stateNode using either G2 or U2 depending on the presence of the updatePayload.
 * For other nodes (excluding tag 4), isBlobOrFileLikeObject recursively traverses the child and sibling fibers.
 *
 * @param {Object} fiberNode - The current Fiber node to process.
 * @param {any} updatePayload - Optional payload to pass to the state node processor.
 * @param {any} accessorStack - Stack used by the state node processors (U2 or G2).
 * @returns {void}
 */
function traverseFiberAndProcessStateNode(fiberNode, updatePayload, accessorStack) {
  const fiberTag = fiberNode.tag;

  // If the Fiber node is a host component (tag 5) or text node (tag 6)
  if (fiberTag === 5 || fiberTag === 6) {
    const stateNode = fiberNode.stateNode;
    if (updatePayload) {
      // If an update payload is provided, use G2 to process the state node
      G2(accessorStack, stateNode, updatePayload);
    } else {
      // Otherwise, use U2 to process the state node
      U2(accessorStack, stateNode);
    }
  } else if (fiberTag !== 4) {
    // For non-host root nodes (tag !== 4), recursively traverse children
    let childFiber = fiberNode.child;
    if (childFiber !== null) {
      // Traverse the child subtree
      traverseFiberAndProcessStateNode(childFiber, updatePayload, accessorStack);
      // Traverse all siblings of the child
      let siblingFiber = childFiber.sibling;
      while (siblingFiber !== null) {
        traverseFiberAndProcessStateNode(siblingFiber, updatePayload, accessorStack);
        siblingFiber = siblingFiber.sibling;
      }
    }
  }
}

module.exports = traverseFiberAndProcessStateNode;