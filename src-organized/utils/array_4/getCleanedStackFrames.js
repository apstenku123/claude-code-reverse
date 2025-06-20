/**
 * Extracts and cleans a stack trace array by removing internal or wrapped frames and normalizing frame properties.
 *
 * @param {Array<Object>} stackFrames - The array of stack frame objects to process. Each object should have at least a 'function' and 'filename' property.
 * @returns {Array<Object>} a cleaned and normalized array of stack frame objects, with internal/wrapped frames removed and missing properties filled in.
 */
function getCleanedStackFrames(stackFrames) {
  // Return empty array if input is empty
  if (!stackFrames.length) return [];

  // Create a shallow copy to avoid mutating the original array
  const framesCopy = Array.from(stackFrames);

  // Remove the last frame if isBlobOrFileLikeObject is a sentryWrapped function
  const lastFrame = framesCopy[framesCopy.length - 1];
  if (/sentryWrapped/.test(lastFrame.function || "")) {
    framesCopy.pop();
  }

  // Reverse the frames for further processing
  framesCopy.reverse();

  // Remove frames matching $6A pattern from the end (now the start after reverse)
  if ($6A.test((framesCopy[framesCopy.length - 1].function) || "")) {
    framesCopy.pop();
    // Remove another if the new last frame also matches $6A
    if ($6A.test((framesCopy[framesCopy.length - 1].function) || "")) {
      framesCopy.pop();
    }
  }

  // Take up to M6A frames, normalize missing properties
  return framesCopy.slice(0, M6A).map(frame => ({
    ...frame,
    filename: frame.filename || framesCopy[framesCopy.length - 1].filename,
    function: frame.function || "?"
  }));
}

module.exports = getCleanedStackFrames;