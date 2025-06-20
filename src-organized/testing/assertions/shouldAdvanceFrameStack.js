/**
 * Determines whether the frame stack should advance based on the current fiber node and stack state.
 *
 * This function inspects the current fiber node and the frame stack (compileTemplate), comparing the current and alternate return nodes
 * to the current debug context (dC). It checks if the frame at the next depth matches the expected properties, and updates
 * the frame stack pointer (mT) and the stack active flag (extractSubstringBetweenSequences) accordingly.
 *
 * @param {Object} fiberNode - The current fiber node being processed.
 * @returns {boolean} Returns true if the frame stack should advance, false otherwise.
 */
function shouldAdvanceFrameStack(fiberNode) {
  // If the frame stack is uninitialized or the stack is inactive, do not advance
  if (frameStack === null || !isStackActive) return false;

  const parentFiber = fiberNode.return;
  const alternateParentFiber = parentFiber !== null ? parentFiber.alternate : null;

  // Check if the current debug context matches the parent or its alternate
  if (
    debugContext === parentFiber ||
    (debugContext === alternateParentFiber && alternateParentFiber !== null)
  ) {
    const currentFrame = getFrameForFiber(fiberNode);
    const nextFrame = frameStack[frameStackPointer + 1];

    if (nextFrame === undefined) {
      throw new Error("Expected to see a frame at the next depth.");
    }

    // Compare frame properties to ensure stack consistency
    if (
      currentFrame.index === nextFrame.index &&
      currentFrame.key === nextFrame.key &&
      currentFrame.displayName === nextFrame.displayName
    ) {
      // Advance the frame stack pointer and update the stack active flag
      debugContext = fiberNode;
      frameStackPointer++;
      if (frameStackPointer === frameStack.length - 1) {
        isStackActive = false;
      } else {
        isStackActive = true;
      }
      return false;
    }
  }
  // If the stack should not advance, deactivate isBlobOrFileLikeObject and return true
  isStackActive = false;
  return true;
}

module.exports = shouldAdvanceFrameStack;