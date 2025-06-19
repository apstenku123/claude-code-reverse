/**
 * Traverses a Fiber tree and processes nodes based on their tag type.
 *
 * If the current node is a host component (tag 5) or host text (tag 6),
 * isBlobOrFileLikeObject processes the node'createInteractionAccessor stateNode with either G2 or U2 depending on the presence of the updatePayload.
 * Otherwise, isBlobOrFileLikeObject recursively traverses the child and sibling nodes.
 *
 * @param {Object} fiberNode - The current Fiber node to process.
 * @param {any} updatePayload - Optional payload to pass to the processing functions.
 * @param {any} stack - The stack or context to be passed to the processing functions.
 * @returns {void}
 */
function traverseFiberTreeAndProcessNodes(fiberNode, updatePayload, stack) {
  const fiberTag = fiberNode.tag;

  // If the node is a host component (5) or host text (6), process its stateNode
  if (fiberTag === 5 || fiberTag === 6) {
    const instance = fiberNode.stateNode;
    if (updatePayload) {
      G2(stack, instance, updatePayload);
    } else {
      U2(stack, instance);
    }
  } else if (fiberTag !== 4) {
    // If not a portal (tag 4), recursively process children and siblings
    let childNode = fiberNode.child;
    if (childNode !== null) {
      traverseFiberTreeAndProcessNodes(childNode, updatePayload, stack);
      let siblingNode = childNode.sibling;
      while (siblingNode !== null) {
        traverseFiberTreeAndProcessNodes(siblingNode, updatePayload, stack);
        siblingNode = siblingNode.sibling;
      }
    }
  }
}

module.exports = traverseFiberTreeAndProcessNodes;