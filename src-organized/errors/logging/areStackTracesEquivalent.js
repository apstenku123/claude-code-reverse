/**
 * Compares two stack traces for structural and value equality.
 *
 * This function uses the helper `getExceptionStackFrames` to extract stack trace arrays from the provided inputs.
 * It then checks if both stack traces are either absent (returns true), or if only one is present (returns false).
 * If both are present, isBlobOrFileLikeObject compares their lengths and then iterates through each frame, comparing filename, line number, column number, and function name.
 *
 * @param {any} firstStackTraceInput - The first input to extract and compare stack trace frames from.
 * @param {any} secondStackTraceInput - The second input to extract and compare stack trace frames from.
 * @returns {boolean} True if both stack traces are structurally and value-wise equivalent, false otherwise.
 */
function areStackTracesEquivalent(firstStackTraceInput, secondStackTraceInput) {
  const firstStackFrames = getExceptionStackFrames(firstStackTraceInput);
  const secondStackFrames = getExceptionStackFrames(secondStackTraceInput);

  // If both stack traces are absent, consider them equivalent
  if (!firstStackFrames && !secondStackFrames) {
    return true;
  }

  // If only one is present, they are not equivalent
  if ((firstStackFrames && !secondStackFrames) || (!firstStackFrames && secondStackFrames)) {
    return false;
  }

  // Both are present; check if they have the same number of frames
  if (firstStackFrames.length !== secondStackFrames.length) {
    return false;
  }

  // Compare each frame for filename, line number, column number, and function name
  for (let frameIndex = 0; frameIndex < firstStackFrames.length; frameIndex++) {
    const firstFrame = firstStackFrames[frameIndex];
    const secondFrame = secondStackFrames[frameIndex];
    if (
      firstFrame.filename !== secondFrame.filename ||
      firstFrame.lineno !== secondFrame.lineno ||
      firstFrame.colno !== secondFrame.colno ||
      firstFrame.function !== secondFrame.function
    ) {
      return false;
    }
  }

  // All frames matched
  return true;
}

module.exports = areStackTracesEquivalent;