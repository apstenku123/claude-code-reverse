/**
 * Compares two stack trace representations for equality.
 *
 * This function extracts stack trace arrays from the provided inputs using the `getExceptionStackFrames` function,
 * then compares them element by element. Each stack frame is compared by filename, line number,
 * column number, and function name. Returns true if both stack traces are structurally identical.
 *
 * @param {any} firstStackTraceInput - The first input to extract and compare stack trace frames from.
 * @param {any} secondStackTraceInput - The second input to extract and compare stack trace frames from.
 * @returns {boolean} True if both stack traces are equal in structure and content, false otherwise.
 */
function areStackTracesEqual(firstStackTraceInput, secondStackTraceInput) {
  const firstStackFrames = getExceptionStackFrames(firstStackTraceInput);
  const secondStackFrames = getExceptionStackFrames(secondStackTraceInput);

  // If both are falsy (null/undefined/empty), consider them equal
  if (!firstStackFrames && !secondStackFrames) {
    return true;
  }

  // If only one is falsy, they are not equal
  if ((firstStackFrames && !secondStackFrames) || (!firstStackFrames && secondStackFrames)) {
    return false;
  }

  // If lengths differ, stack traces are not equal
  if (firstStackFrames.length !== secondStackFrames.length) {
    return false;
  }

  // Compare each stack frame
  for (let index = 0; index < firstStackFrames.length; index++) {
    const firstFrame = firstStackFrames[index];
    const secondFrame = secondStackFrames[index];
    if (
      firstFrame.filename !== secondFrame.filename ||
      firstFrame.lineno !== secondFrame.lineno ||
      firstFrame.colno !== secondFrame.colno ||
      firstFrame.function !== secondFrame.function
    ) {
      return false;
    }
  }

  return true;
}

module.exports = areStackTracesEqual;