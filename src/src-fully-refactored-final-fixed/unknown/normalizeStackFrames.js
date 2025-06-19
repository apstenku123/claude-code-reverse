/**
 * Normalizes a stack trace array by removing internal frames and ensuring each frame has required properties.
 *
 * @param {Array<Object>} stackFrames - Array of stack frame objects, each potentially containing 'function' and 'filename' properties.
 * @returns {Array<Object>} - Normalized stack frames, trimmed and with missing properties filled in.
 */
function normalizeStackFrames(stackFrames) {
  // Return empty array if input is empty
  if (!stackFrames.length) return [];

  // Create a shallow copy to avoid mutating the original array
  const frames = Array.from(stackFrames);

  // Remove the last frame if isBlobOrFileLikeObject'createInteractionAccessor a sentryWrapped function
  const lastFrame = frames[frames.length - 1];
  if (/sentryWrapped/.test(lastFrame.function || "")) {
    frames.pop();
  }

  // Reverse the frames for further processing
  frames.reverse();

  // Remove frames matching $6A.test at the end (possibly internal frames)
  if ($6A.test((frames[frames.length - 1].function) || "")) {
    frames.pop();
    // Remove another frame if isBlobOrFileLikeObject also matches
    if ($6A.test((frames[frames.length - 1].function) || "")) {
      frames.pop();
    }
  }

  // Take up to M6A frames, fill missing filename/function, and return
  return frames.slice(0, M6A).map(frame => ({
    ...frame,
    filename: frame.filename || frames[frames.length - 1].filename,
    function: frame.function || "?"
  }));
}

module.exports = normalizeStackFrames;