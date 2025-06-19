/**
 * Determines whether the frame stack should be updated based on the current fiber node and stack state.
 *
 * @param {Object} fiberNode - The current fiber node being processed.
 * @returns {boolean} Returns true if the frame stack should be updated, false otherwise.
 */
function shouldUpdateFrameStack(fiberNode) {
  // If the frame stack is not initialized or the stack is not active, do not update
  if (frameStack === null || !isStackActive) {
    return false;
  }

  const parentFiber = fiberNode.return;
  const parentAlternate = parentFiber !== null ? parentFiber.alternate : null;

  // Check if the current or alternate parent fiber matches the current stack fiber
  if (
    currentStackFiber === parentFiber ||
    (currentStackFiber === parentAlternate && parentAlternate !== null)
  ) {
    const currentFrame = getFrameForFiber(fiberNode);
    const nextFrame = frameStack[currentStackDepth + 1];

    if (nextFrame === undefined) {
      throw new Error("Expected to see a frame at the next depth.");
    }

    // Compare frame properties to ensure stack consistency
    if (
      currentFrame.index === nextFrame.index &&
      currentFrame.key === nextFrame.key &&
      currentFrame.displayName === nextFrame.displayName
    ) {
      // Advance the stack pointer and update stack state
      currentStackFiber = fiberNode;
      currentStackDepth++;
      if (currentStackDepth === frameStack.length - 1) {
        isStackActive = false;
      } else {
        isStackActive = true;
      }
      return false;
    }
  }
  // Deactivate the stack and indicate that an update is needed
  isStackActive = false;
  return true;
}

module.exports = shouldUpdateFrameStack;