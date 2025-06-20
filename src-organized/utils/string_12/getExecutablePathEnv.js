/**
 * Determines the search path and executable extensions for resolving executables in the current environment.
 *
 * @param {string} executableName - The name of the executable to resolve (e.g., 'node', 'python').
 * @param {Object} options - Configuration options for path resolution.
 * @param {string} [options.colon] - Path separator override (defaults to tO6).
 * @param {string} [options.path] - Custom PATH string to use instead of process.env.PATH.
 * @param {string} [options.pathExt] - Custom PATHEXT string to use instead of process.env.PATHEXT (Windows only).
 * @returns {Object} An object containing the parsed path environment, executable extensions, and the raw extension string.
 * @property {string[]} pathEnv - Array of directories to search for executables.
 * @property {string[]} pathExt - Array of executable file extensions (Windows only).
 * @property {string} pathExtExe - The raw PATHEXT string (Windows only).
 */
function getExecutablePathEnv(executableName, options) {
  // Use the provided path separator or fallback to tO6 (platform-specific separator)
  const pathSeparator = options.colon || tO6;

  // Determine if the executable name contains a path separator (either '/' or '\' on Windows)
  const hasPathSeparator = executableName.match(/\//) || (Um && executableName.match(/\\/));

  // Build the PATH search array:
  // - If the executable name contains a path separator, only search the current directory
  // - Otherwise, build the search path from process.cwd() (on Windows) and PATH environment variable
  const pathEnv = hasPathSeparator
    ? [""]
    : [
        ...(Um ? [process.cwd()] : []),
        ...((options.path || process.env.PATH || "").split(pathSeparator))
      ];

  // On Windows, determine the executable extensions to search for
  const pathExtExe = Um
    ? options.pathExt || process.env.PATHEXT || ".EXE;.CMD;.BAT;.COM"
    : "";

  // On Windows, split the extensions string into an array; otherwise, use an array with an empty string
  const pathExt = Um ? pathExtExe.split(pathSeparator) : [""];

  // On Windows, if the executable name contains a dot and the first extension is not empty, prepend an empty string
  if (Um) {
    if (executableName.indexOf(".") !== -1 && pathExt[0] !== "") {
      pathExt.unshift("");
    }
  }

  return {
    pathEnv,
    pathExt,
    pathExtExe
  };
}

module.exports = getExecutablePathEnv;