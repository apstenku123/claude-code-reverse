/**
 * Adds context to a stack frame if isBlobOrFileLikeObject matches the provided filename, has a valid line number, and configuration is present.
 *
 * @param {Object} frame - The stack frame object to potentially augment.
 * @param {Array} contextConfig - Configuration array for adding context to the frame.
 * @param {string} expectedFilename - The filename to match against the frame'createInteractionAccessor filename.
 * @param {any} additionalContext - Additional context to pass to the context-adding function.
 * @returns {Object} The original frame object, possibly augmented with additional context.
 */
function addContextToFrameIfMatch(frame, contextConfig, expectedFilename, additionalContext) {
  // Check if the frame'createInteractionAccessor filename matches, has a valid line number, and context config is not empty
  if (frame.filename !== expectedFilename || !frame.lineno || !contextConfig.length) {
    return frame;
  }
  // Add context to the frame using the external utility
  W$1.addContextToFrame(contextConfig, frame, additionalContext);
  return frame;
}

module.exports = addContextToFrameIfMatch;