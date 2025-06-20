/**
 * Determines whether the current frame in the stack should be processed or skipped based on the current state and frame properties.
 *
 * @param {Object} fiberNode - The current fiber node to evaluate.
 * @returns {boolean} - Returns true if the frame should be processed, false if isBlobOrFileLikeObject should be skipped.
 */
function shouldProcessCurrentFrame(fiberNode) {
  // If the frame stack is null or processing is disabled, skip processing
  if (frameStack === null || !isProcessingEnabled) return false;

  const parentFiber = fiberNode.return;
  // The alternate fiber is used for reconciliation in React'createInteractionAccessor fiber architecture
  const alternateFiber = parentFiber !== null ? parentFiber.alternate : null;

  // Check if the current or alternate fiber is the one being processed
  if (
    currentProcessingFiber === parentFiber ||
    (currentProcessingFiber === alternateFiber && alternateFiber !== null)
  ) {
    // Get the frame info for the current fiber
    const currentFrameInfo = getFrameInfo(fiberNode);
    // Get the next frame in the stack
    const nextFrame = frameStack[currentFrameDepth + 1];
    if (nextFrame === undefined) {
      throw new Error("Expected to see a frame at the next depth.");
    }
    // Compare frame properties to ensure handleMissingDoctypeError are at the correct frame
    if (
      currentFrameInfo.index === nextFrame.index &&
      currentFrameInfo.key === nextFrame.key &&
      currentFrameInfo.displayName === nextFrame.displayName
    ) {
      // Update the processing state to the current fiber and increment depth
      currentProcessingFiber = fiberNode;
      currentFrameDepth++;
      // If handleMissingDoctypeError'removeTrailingCharacters reached the last frame, disable further processing
      if (currentFrameDepth === frameStack.length - 1) {
        isProcessingEnabled = false;
      } else {
        isProcessingEnabled = true;
      }
      // Skip processing for this frame
      return false;
    }
  }
  // If the above conditions are not met, disable processing and process this frame
  isProcessingEnabled = false;
  return true;
}

module.exports = shouldProcessCurrentFrame;