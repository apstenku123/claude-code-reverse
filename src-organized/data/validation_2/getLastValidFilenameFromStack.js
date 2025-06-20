/**
 * Retrieves the filename from the last valid stack frame in the provided stack trace array.
 * a valid stack frame is one that has a 'filename' property not equal to '<anonymous>' or '[native code]'.
 *
 * @param {Array<Object>} stackFrames - Array of stack frame objects, each potentially containing a 'filename' property.
 * @returns {string|null} The filename of the last valid stack frame, or null if none found.
 */
function getLastValidFilenameFromStack(stackFrames = []) {
  // Iterate backwards through the stack frames to find the last valid filename
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

module.exports = getLastValidFilenameFromStack;