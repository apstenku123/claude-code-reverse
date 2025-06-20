/**
 * Extracts and constructs path environment details for command resolution.
 *
 * This function determines the search paths and executable extensions for a given command name,
 * taking into account platform-specific conventions (such as Windows vs. POSIX).
 *
 * @param {string} commandName - The name of the command to resolve (e.g., 'node', 'npm').
 * @param {Object} options - Configuration options for path resolution.
 * @param {string} [options.colon] - The path separator to use (defaults to tO6).
 * @param {string} [options.path] - The PATH environment variable to use (defaults to process.env.PATH).
 * @param {string} [options.pathExt] - The PATHEXT environment variable to use (defaults to process.env.PATHEXT).
 * @returns {Object} An object containing the parsed path environment, executable extensions, and extension string.
 * @property {string[]} pathEnv - Array of directories to search for the command.
 * @property {string[]} pathExt - Array of executable file extensions to consider (Windows only).
 * @property {string} pathExtExe - The PATHEXT string (Windows only).
 */
function getPathEnvironmentDetails(commandName, options) {
  // Determine the path separator (':' on POSIX, ';' on Windows, or as provided)
  const pathSeparator = options.colon || tO6;

  // Build the array of search paths:
  // - If the command contains a slash (or backslash on Windows), search only in the current directory
  // - Otherwise, build from process.cwd() (on Windows) and PATH environment variable
  const isWindows = Um;
  const hasSlash = commandName.match(/\//) || (isWindows && commandName.match(/\\/));

  let searchPaths;
  if (hasSlash) {
    searchPaths = [""];
  } else {
    const cwdArray = isWindows ? [process.cwd()] : [];
    const envPath = options.path || process.env.PATH || "";
    searchPaths = [...cwdArray, ...envPath.split(pathSeparator)];
  }

  // On Windows, determine executable extensions (PATHEXT)
  let executableExtensionsString = "";
  let executableExtensions = [""];
  if (isWindows) {
    executableExtensionsString = options.pathExt || process.env.PATHEXT || ".EXE;.CMD;.BAT;.COM";
    executableExtensions = executableExtensionsString.split(pathSeparator);
    // If the command already has an extension and the first extension is not empty, add empty string to the front
    if (commandName.indexOf(".") !== -1 && executableExtensions[0] !== "") {
      executableExtensions.unshift("");
    }
  }

  return {
    pathEnv: searchPaths,
    pathExt: executableExtensions,
    pathExtExe: executableExtensionsString
  };
}

module.exports = getPathEnvironmentDetails;