/**
 * Determines whether the given fiber node should be processed further during traversal.
 * This function checks the current traversal state and compares the provided fiber node
 * with the expected frame at the next depth. It updates traversal state accordingly.
 *
 * @param {Object} fiberNode - The fiber node to check.
 * @returns {boolean} Returns true if the fiber node should be processed, false otherwise.
 */
function shouldProcessFiberNode(fiberNode) {
  // If there is no frame stack or traversal is not active, skip processing
  if (frameStack === null || !isTraversalActive) return false;

  const parentFiber = fiberNode.return;
  const parentAlternate = parentFiber !== null ? parentFiber.alternate : null;

  // Check if the current fiber is the one being traversed or its alternate
  if (
    currentFiber === parentFiber ||
    (currentFiber === parentAlternate && parentAlternate !== null)
  ) {
    const currentFrame = getFiberFrame(fiberNode);
    const nextFrame = frameStack[currentDepth + 1];

    if (nextFrame === undefined) {
      throw new Error("Expected to see a frame at the next depth.");
    }

    // Compare frame properties to ensure correct traversal
    if (
      currentFrame.index === nextFrame.index &&
      currentFrame.key === nextFrame.key &&
      currentFrame.displayName === nextFrame.displayName
    ) {
      // Update traversal state
      currentFiber = fiberNode;
      currentDepth++;
      if (currentDepth === frameStack.length - 1) {
        isTraversalActive = false;
      } else {
        isTraversalActive = true;
      }
      return false;
    }
  }
  // If checks fail, mark traversal as inactive and indicate processing is needed
  isTraversalActive = false;
  return true;
}

module.exports = shouldProcessFiberNode;