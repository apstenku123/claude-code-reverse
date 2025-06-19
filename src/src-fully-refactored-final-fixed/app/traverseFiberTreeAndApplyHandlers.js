/**
 * Traverses a fiber tree and applies the appropriate handler functions to each node.
 *
 * @param {Object} fiberNode - The current fiber node to process.
 * @param {any} handlerArgument - An argument to be passed to the handler functions.
 * @param {any} context - The context or state to be used by the handler functions.
 * @returns {void}
 *
 * If the fiber node is of type 5 or 6, applies either G2 or U2 handler to its stateNode.
 * Otherwise, recursively traverses its child and sibling nodes.
 */
function traverseFiberTreeAndApplyHandlers(fiberNode, handlerArgument, context) {
  const fiberTag = fiberNode.tag;

  // If the node is a host component (tag 5) or host text (tag 6)
  if (fiberTag === 5 || fiberTag === 6) {
    const stateNode = fiberNode.stateNode;
    if (handlerArgument) {
      // Apply the G2 handler if handlerArgument is provided
      G2(context, stateNode, handlerArgument);
    } else {
      // Otherwise, apply the U2 handler
      U2(context, stateNode);
    }
  } else if (fiberTag !== 4) {
    // If the node is not a portal (tag 4), traverse its children
    let childNode = fiberNode.child;
    if (childNode !== null) {
      // Recursively process the child node and its siblings
      traverseFiberTreeAndApplyHandlers(childNode, handlerArgument, context);
      let siblingNode = childNode.sibling;
      while (siblingNode !== null) {
        traverseFiberTreeAndApplyHandlers(siblingNode, handlerArgument, context);
        siblingNode = siblingNode.sibling;
      }
    }
  }
}

module.exports = traverseFiberTreeAndApplyHandlers;