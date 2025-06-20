/**
 * Determines the search path environment and executable extensions for resolving executables.
 *
 * @param {string} executableName - The name of the executable to resolve.
 * @param {Object} options - Configuration options for path resolution.
 * @param {string} [options.colon] - Path separator override (defaults to tO6).
 * @param {string} [options.path] - Custom PATH string (defaults to process.env.PATH).
 * @param {string} [options.pathExt] - Custom PATHEXT string (defaults to process.env.PATHEXT).
 * @returns {Object} An object containing the path environment array, executable extensions array, and the raw extensions string.
 * @property {string[]} pathEnv - Array of directories to search for executables.
 * @property {string[]} pathExt - Array of executable file extensions.
 * @property {string} pathExtExe - Raw string of executable extensions.
 */
function getExecutablePathEnvironment(executableName, options) {
  // Use provided path separator or fallback to tO6
  const pathSeparator = options.colon || tO6;

  // Determine if the executable name contains a path separator (either '/' or '\' on Windows)
  const hasPathSeparator = executableName.match(/\//) || (Um && executableName.match(/\\/));

  // Build the array of directories to search for executables
  const pathEnv = hasPathSeparator
    ? [""] // If the executable name contains a path separator, search only in the current directory
    : [
        ...(Um ? [process.cwd()] : []), // On Windows, include the current working directory first
        ...((options.path || process.env.PATH || "").split(pathSeparator)) // Split PATH into array
      ];

  // On Windows, determine the executable extensions string (e.g., ".EXE;.CMD;.BAT;.COM")
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

module.exports = getExecutablePathEnvironment;