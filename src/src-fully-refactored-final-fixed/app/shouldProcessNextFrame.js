/**
 * Determines whether the next frame in the stack should be processed or not.
 * This function checks the current processing context and frame stack to decide
 * if processing should continue or halt, based on the current and parent frames.
 *
 * @param {Object} fiberNode - The current fiber node being processed.
 * @returns {boolean} - Returns true if the next frame should be processed, false otherwise.
 */
function shouldProcessNextFrame(fiberNode) {
  // If the frame stack is not initialized or processing is disabled, halt processing
  if (frameStack === null || !isProcessingEnabled) {
    return false;
  }

  const parentFiber = fiberNode.return;
  // The alternate fiber is used for reconciliation in React'createInteractionAccessor fiber architecture
  const alternateParentFiber = parentFiber !== null ? parentFiber.alternate : null;

  // Check if the current processing fiber matches the parent or its alternate
  if (
    currentProcessingFiber === parentFiber ||
    (currentProcessingFiber === alternateParentFiber && alternateParentFiber !== null)
  ) {
    // Retrieve the frame info for the current fiber
    const currentFrameInfo = getFrameInfo(fiberNode);
    // Get the next frame in the stack
    const nextFrame = frameStack[currentFrameIndex + 1];
    if (nextFrame === undefined) {
      throw new Error("Expected to see a frame at the next depth.");
    }
    // Compare frame info to ensure correct stack alignment
    if (
      currentFrameInfo.index === nextFrame.index &&
      currentFrameInfo.key === nextFrame.key &&
      currentFrameInfo.displayName === nextFrame.displayName
    ) {
      // Advance the processing context
      currentProcessingFiber = fiberNode;
      currentFrameIndex++;
      // If handleMissingDoctypeError'removeTrailingCharacters reached the end of the stack, disable further processing
      if (currentFrameIndex === frameStack.length - 1) {
        isProcessingEnabled = false;
      } else {
        isProcessingEnabled = true;
      }
      return false;
    }
  }
  // If the stack check fails, disable processing and signal to process the next frame
  isProcessingEnabled = false;
  return true;
}

module.exports = shouldProcessNextFrame;