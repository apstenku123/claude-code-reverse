/**
 * Extracts and formats stack frame metadata from a given stack frame object, filename, and module resolver.
 *
 * @param {Object} stackFrame - The stack frame object containing location and function information.
 * @param {string} [filename] - The filename string, possibly prefixed with 'file://'.
 * @param {Function} resolveModule - Function that takes a filename and returns the module name.
 * @returns {Object} An object containing cleaned stack frame metadata with undefined values dropped.
 */
function createStackFrameMetadata(stackFrame, filename, resolveModule) {
  // Remove 'file://' prefix if present, otherwise undefined if filename is falsy
  const cleanedFilename = filename ? filename.replace(/^file:\/\//, "") : undefined;

  // Increment column number by 1 if present
  const columnNumber = stackFrame.location.columnNumber !== undefined
    ? stackFrame.location.columnNumber + 1
    : undefined;

  // Increment line number by 1 if present
  const lineNumber = stackFrame.location.lineNumber !== undefined
    ? stackFrame.location.lineNumber + 1
    : undefined;

  // Compose the stack frame metadata object
  const stackFrameMetadata = {
    filename: cleanedFilename,
    module: resolveModule(cleanedFilename),
    function: stackFrame.functionName || "?",
    colno: columnNumber,
    lineno: lineNumber,
    // Determine if the filename is considered 'in app' if filename exists
    in_app: cleanedFilename ? El2.filenameIsInApp(cleanedFilename) : undefined
  };

  // Remove keys with undefined values before returning
  return wl2.dropUndefinedKeys(stackFrameMetadata);
}

module.exports = createStackFrameMetadata;