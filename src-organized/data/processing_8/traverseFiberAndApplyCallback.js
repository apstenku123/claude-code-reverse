/**
 * Traverses a Fiber tree and applies a callback to each node based on its tag type.
 *
 * @param {Object} fiberNode - The current Fiber node to process.
 * @param {any} callbackArg - An argument passed to the callback functions (G2 or U2).
 * @param {any} context - Additional context or data required by the callback functions.
 * @returns {void}
 */
function traverseFiberAndApplyCallback(fiberNode, callbackArg, context) {
  const fiberTag = fiberNode.tag;

  // If the fiber is a HostComponent (5) or HostText (6), process its stateNode
  if (fiberTag === 5 || fiberTag === 6) {
    const instance = fiberNode.stateNode;
    if (callbackArg) {
      // If callbackArg is provided, use G2
      G2(context, instance, callbackArg);
    } else {
      // Otherwise, use U2
      U2(context, instance);
    }
  } else if (fiberTag !== 4) {
    // If the fiber is not a HostPortal (4), traverse its children
    let childFiber = fiberNode.child;
    if (childFiber !== null) {
      // Recursively process the child fiber and its siblings
      traverseFiberAndApplyCallback(childFiber, callbackArg, context);
      let siblingFiber = childFiber.sibling;
      while (siblingFiber !== null) {
        traverseFiberAndApplyCallback(siblingFiber, callbackArg, context);
        siblingFiber = siblingFiber.sibling;
      }
    }
  }
}

module.exports = traverseFiberAndApplyCallback;