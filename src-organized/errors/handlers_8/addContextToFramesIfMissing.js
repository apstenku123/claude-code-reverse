/**
 * Adds context information to stack frames that are missing context lines.
 *
 * Iterates over a collection of stack frame objects, and for each frame that has a filename
 * but is missing a context line, attempts to retrieve the corresponding source file contents
 * and add context information to the frame using the provided context options.
 *
 * @param {Array<Object>} stackFrames - Array of stack frame objects to process. Each frame should have at least a 'filename' property.
 * @param {Object} contextOptions - Options or configuration to use when adding context to a frame.
 * @returns {void}
 */
function addContextToFramesIfMissing(stackFrames, contextOptions) {
  for (const frame of stackFrames) {
    // Only process frames with a filename and missing context_line
    if (frame.filename && frame.context_line === undefined) {
      // Attempt to retrieve the source file contents for the frame
      const sourceFile = d91.get(frame.filename);
      if (sourceFile) {
        try {
          // Add context information to the frame using the external utility
          aGA.addContextToFrame(sourceFile, frame, contextOptions);
        } catch (error) {
          // Silently ignore errors when adding context
        }
      }
    }
  }
}

module.exports = addContextToFramesIfMissing;