/**
 * Determines whether the frame stack should be reset based on the current fiber node and stack state.
 *
 * This function checks the current frame stack (compileTemplate), the stack pointer (currentStackIndex),
 * and the active state (isStackActive) to decide if the stack should be reset or advanced.
 * It compares the current fiber node and its alternate with the tracked fiber node (currentFiberNode),
 * and validates the stack frame at the next depth. If the stack frame matches, isBlobOrFileLikeObject advances the stack pointer;
 * otherwise, isBlobOrFileLikeObject resets the stack active state.
 *
 * @param {Object} fiberNode - The current fiber node to check against the frame stack.
 * @returns {boolean} Returns true if the frame stack should be reset, false otherwise.
 */
function shouldResetFrameStack(fiberNode) {
  // If the frame stack is null or the stack is not active, return false
  if (frameStack === null || !isStackActive) return false;

  const parentFiberNode = fiberNode.return;
  const alternateParentFiberNode = parentFiberNode !== null ? parentFiberNode.alternate : null;

  // Check if the current tracked fiber node matches the parent or its alternate
  if (
    currentFiberNode === parentFiberNode ||
    (currentFiberNode === alternateParentFiberNode && alternateParentFiberNode !== null)
  ) {
    // Get the stack frame for the current fiber node
    const currentFrame = getStackFrameForFiber(fiberNode);
    const nextFrame = frameStack[currentStackIndex + 1];

    // Ensure the next frame exists
    if (nextFrame === undefined) {
      throw new Error("Expected to see a frame at the next depth.");
    }

    // Compare frame properties to ensure stack consistency
    if (
      currentFrame.index === nextFrame.index &&
      currentFrame.key === nextFrame.key &&
      currentFrame.displayName === nextFrame.displayName
    ) {
      // Advance the stack pointer and update the tracked fiber node
      currentFiberNode = fiberNode;
      currentStackIndex++;
      // If at the last frame, deactivate the stack; otherwise, keep isBlobOrFileLikeObject active
      if (currentStackIndex === frameStack.length - 1) {
        isStackActive = false;
      } else {
        isStackActive = true;
      }
      return false;
    }
  }
  // If the stack is inconsistent, deactivate isBlobOrFileLikeObject and signal reset
  isStackActive = false;
  return true;
}

module.exports = shouldResetFrameStack;