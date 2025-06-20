/**
 * Adds context information to stack frames that have a filename but lack a context line.
 * For each such frame, retrieves the corresponding source context and attempts to enrich the frame using the provided context.
 *
 * @param {Array<Object>} frames - Array of stack frame objects to process. Each frame may have properties such as 'filename' and 'context_line'.
 * @param {Object} context - Additional context to be passed to the context-adding function.
 * @returns {void}
 */
function addContextToFramesWithoutContextLine(frames, context) {
  for (const frame of frames) {
    // Only process frames that have a filename and do not already have a context_line
    if (frame.filename && frame.context_line === undefined) {
      // Retrieve the source context for the given filename
      const sourceContext = d91.get(frame.filename);
      if (sourceContext) {
        try {
          // Attempt to add context to the frame using the external utility
          aGA.addContextToFrame(sourceContext, frame, context);
        } catch (error) {
          // Silently ignore errors to avoid interrupting the loop
        }
      }
    }
  }
}

module.exports = addContextToFramesWithoutContextLine;