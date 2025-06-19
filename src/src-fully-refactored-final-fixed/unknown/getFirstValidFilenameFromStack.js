/**
 * Retrieves the first valid filename from a stack trace array, skipping anonymous and native code entries.
 *
 * @param {Array<Object>} stackFrames - An array of stack frame objects, each potentially containing a 'filename' property.
 * @returns {string|null} The first valid filename found, or null if none is found.
 */
function getFirstValidFilenameFromStack(stackFrames = []) {
  // Iterate backwards through the stack frames to find the most recent valid filename
  for (let index = stackFrames.length - 1; index >= 0; index--) {
    const frame = stackFrames[index];
    // Check if the frame exists and has a valid filename
    if (
      frame &&
      frame.filename !== "<anonymous>" &&
      frame.filename !== "[native code]"
    ) {
      // Return the filename if present, otherwise null
      return frame.filename || null;
    }
  }
  // Return null if no valid filename is found
  return null;
}

module.exports = getFirstValidFilenameFromStack;