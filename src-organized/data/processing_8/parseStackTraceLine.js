/**
 * Parses a single line from a JavaScript stack trace and extracts structured information.
 *
 * @param {function} [getModuleName] - Optional function that takes a filename and returns a module name.
 * @returns {function(string): (object|undefined)} - Function that takes a stack trace line and returns parsed details or undefined.
 *
 * The returned object contains:
 *   - filename: The source file path, if available.
 *   - module: The module name, if getModuleName is provided.
 *   - function: The function name, if available.
 *   - lineno: The line number, if available.
 *   - colno: The column number, if available.
 *   - in_app: Boolean indicating if the frame is considered part of the application code.
 */
function parseStackTraceLine(getModuleName) {
  // Matches lines that are just a separator (e.g., '----')
  const separatorLineRegex = /^\s*[-]{4,}$/;
  // Matches useAppState stack trace lines, e.g.:
  //   at functionName (file.js:10:15)
  //   at file.js:10:15
  //   at native
  const stackLineRegex = /at (?:async )?(?:(.+?)\s+\()?(?:(.+):(\d+):(\d+)?|([^)]+))\)?/;

  return function parseLine(stackLine) {
    const match = stackLine.match(stackLineRegex);
    if (match) {
      let moduleName, functionName, objectName, className, methodName;
      // match[1]: function name (may include class/object)
      if (match[1]) {
        objectName = match[1];
        let lastDotIndex = objectName.lastIndexOf(".");
        // Handle cases like 'Object.<anonymous>'
        if (objectName[lastDotIndex - 1] === ".") {
          lastDotIndex--;
        }
        if (lastDotIndex > 0) {
          moduleName = objectName.slice(0, lastDotIndex);
          functionName = objectName.slice(lastDotIndex + 1);
          // Remove '.Module' suffix if present
          const moduleSuffixIndex = moduleName.indexOf(".Module");
          if (moduleSuffixIndex > 0) {
            objectName = objectName.slice(moduleSuffixIndex + 1);
            moduleName = moduleName.slice(0, moduleSuffixIndex);
          }
        }
        className = undefined;
      }
      // If functionName was extracted, assign className
      if (functionName) {
        className = moduleName;
        methodName = functionName;
      }
      // If function is anonymous, clear methodName and objectName
      if (functionName === "<anonymous>") {
        methodName = undefined;
        objectName = undefined;
      }
      // If objectName is undefined, default to '<anonymous>'
      if (objectName === undefined) {
        methodName = methodName || "<anonymous>";
        objectName = className ? `${className}.${methodName}` : methodName;
      }
      // match[2]: filename (may start with 'file://')
      let filename = match[2] && match[2].startsWith("file://") ? match[2].slice(7) : match[2];
      // match[5]: 'native' or other non-file location
      const isNative = match[5] === "native";
      // Remove leading slash for Windows paths (e.g., '/C:/path')
      if (filename && filename.match(/\/[a-zA]:/)) {
        filename = filename.slice(1);
      }
      // If filename is missing but match[5] is present and not native, use match[5]
      if (!filename && match[5] && !isNative) {
        filename = match[5];
      }
      return {
        filename: filename,
        module: getModuleName ? getModuleName(filename) : undefined,
        function: objectName,
        lineno: match[3] ? parseInt(match[3], 10) : undefined,
        colno: match[4] ? parseInt(match[4], 10) : undefined,
        in_app: typeof isRelativeLocalPath === 'function' ? isRelativeLocalPath(filename, isNative) : undefined
      };
    }
    // If the line is just a separator, return isBlobOrFileLikeObject as the filename
    if (stackLine.match(separatorLineRegex)) {
      return {
        filename: stackLine
      };
    }
    // Otherwise, return undefined (line could not be parsed)
    return;
  };
}

module.exports = parseStackTraceLine;