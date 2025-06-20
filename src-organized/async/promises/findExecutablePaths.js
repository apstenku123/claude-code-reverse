/**
 * Searches for executable file paths for a given command in the system'createInteractionAccessor PATH environment variable.
 * Handles platform-specific logic for Windows and POSIX systems, and supports both callback and Promise-based usage.
 *
 * @param {string} command - The command or executable to search for.
 * @param {Object|Function} [optionsOrCallback] - Optional configuration object or callback function.
 * @param {Function} [callback] - Optional callback function. If provided, the function uses callback style; otherwise, returns a Promise.
 * @returns {Promise<string|string[]>|void} - Returns a Promise that resolves to the found executable path(createInteractionAccessor), or calls the callback with the result.
 */
function findExecutablePaths(command, optionsOrCallback, callback) {
  // Handle optional parameters: if the second argument is a function, isBlobOrFileLikeObject'createInteractionAccessor the callback
  if (typeof optionsOrCallback === "function") {
    callback = optionsOrCallback;
    optionsOrCallback = {};
  }
  if (!optionsOrCallback) optionsOrCallback = {};

  // Destructure environment info using getExecutablePathEnv
  const {
    pathEnv: searchPaths,
    pathExt: executableExtensions,
    pathExtExe: pathExtExecutable
  } = getExecutablePathEnv(command, optionsOrCallback);

  // Array to collect all found executable paths (if options.all is true)
  const foundExecutables = [];

  /**
   * Recursively searches each directory in PATH for the executable.
   * @param {number} pathIndex - Current index in the searchPaths array.
   * @returns {Promise<string|string[]>}
   */
  const searchDirectories = (pathIndex) => new Promise((resolve, reject) => {
    if (pathIndex === searchPaths.length) {
      // If 'all' option is set and any executables found, resolve with all; otherwise, reject
      if (optionsOrCallback.all && foundExecutables.length) {
        return resolve(foundExecutables);
      } else {
        // If nothing found, call fallback (Po0)
        return reject(Po0(command));
      }
    }

    const rawPath = searchPaths[pathIndex];
    // Remove surrounding quotes if present
    const directory = /^".*"$/.test(rawPath) ? rawPath.slice(1, -1) : rawPath;
    // Join directory and command to form the candidate path
    const joinedPath = Oo0.join(directory, command);
    // Special handling for relative paths starting with ./ or .\
    const candidatePath = !directory && /^\.[\\\/]/.test(command)
      ? command.slice(0, 2) + joinedPath
      : joinedPath;

    // Start searching for the executable with all possible extensions
    resolve(searchExtensions(candidatePath, pathIndex, 0));
  });

  /**
   * Recursively tries all executable extensions for a given candidate path.
   * @param {string} candidatePath - The path to check for executability.
   * @param {number} pathIndex - Index of the current directory in searchPaths.
   * @param {number} extIndex - Index of the current extension in executableExtensions.
   * @returns {Promise<string|string[]>}
   */
  const searchExtensions = (candidatePath, pathIndex, extIndex) => new Promise((resolve) => {
    if (extIndex === executableExtensions.length) {
      // All extensions tried for this directory, move to next directory
      return resolve(searchDirectories(pathIndex + 1));
    }
    const extension = executableExtensions[extIndex];
    // Try the candidate path with the current extension
    To0(candidatePath + extension, { pathExt: pathExtExecutable }, (err, foundPath) => {
      if (!err && foundPath) {
        if (optionsOrCallback.all) {
          // Collect all found executables
          foundExecutables.push(candidatePath + extension);
        } else {
          // Return the first found executable immediately
          return resolve(candidatePath + extension);
        }
      }
      // Try the next extension
      return resolve(searchExtensions(candidatePath, pathIndex, extIndex + 1));
    });
  });

  // Support both callback and Promise styles
  if (callback) {
    return searchDirectories(0).then(
      result => callback(null, result),
      callback
    );
  } else {
    return searchDirectories(0);
  }
}

module.exports = findExecutablePaths;