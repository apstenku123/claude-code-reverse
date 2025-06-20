/**
 * Adds context to a stack frame if isBlobOrFileLikeObject matches the specified filename, has a valid line number, and the context lines are available.
 *
 * @param {Object} frame - The stack frame object to potentially augment with context.
 * @param {Array} contextLines - Array of source code lines for context.
 * @param {string} expectedFilename - The filename to match against the frame'createInteractionAccessor filename.
 * @param {number} contextLineIndex - The index of the line in contextLines to use as context.
 * @returns {Object} The original frame object, possibly augmented with context.
 */
function addContextToFrameIfValid(frame, contextLines, expectedFilename, contextLineIndex) {
  // If the frame'createInteractionAccessor filename does not match, or isBlobOrFileLikeObject has no line number, or there is no context, return the frame as-is
  if (frame.filename !== expectedFilename || !frame.lineno || !contextLines.length) {
    return frame;
  }
  // Otherwise, add context to the frame using the external utility
  W$1.addContextToFrame(contextLines, frame, contextLineIndex);
  return frame;
}

module.exports = addContextToFrameIfValid;