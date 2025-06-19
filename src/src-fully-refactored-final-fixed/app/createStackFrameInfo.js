/**
 * Generates a stack frame information object from a source frame, filename, and module resolver.
 *
 * @param {Object} sourceFrame - The stack frame object containing location and function name.
 * @param {string} [filename] - The filename, possibly prefixed with 'file://'.
 * @param {Function} resolveModule - Function that takes a filename and returns the module name.
 * @returns {Object} An object containing stack frame details with undefined keys dropped.
 */
function createStackFrameInfo(sourceFrame, filename, resolveModule) {
  // Remove 'file://' prefix if present
  const normalizedFilename = filename ? filename.replace(/^file:\/\//, "") : undefined;

  // Column number is incremented by 1 if present
  const columnNumber = sourceFrame.location.columnNumber !== undefined
    ? sourceFrame.location.columnNumber + 1
    : undefined;

  // Line number is incremented by 1 if present
  const lineNumber = sourceFrame.location.lineNumber !== undefined
    ? sourceFrame.location.lineNumber + 1
    : undefined;

  // Build the stack frame info object
  const stackFrameInfo = {
    filename: normalizedFilename,
    module: resolveModule(normalizedFilename),
    function: sourceFrame.functionName || "?",
    colno: columnNumber,
    lineno: lineNumber,
    // Determine if the filename is considered part of the app
    in_app: normalizedFilename ? El2.filenameIsInApp(normalizedFilename) : undefined
  };

  // Remove any keys with undefined values
  return wl2.dropUndefinedKeys(stackFrameInfo);
}

module.exports = createStackFrameInfo;