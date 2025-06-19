/**
 * Attempts to resolve the full path to an executable file by searching through the system PATH and possible extensions.
 * Optionally, calls a callback with the result or returns a Promise.
 *
 * @param {string} command - The name of the command/executable to resolve.
 * @param {Object|Function} [optionsOrCallback] - Optional configuration object or callback function.
 * @param {Function} [callback] - Optional callback function to be called with the result.
 * @returns {Promise<string|string[]>|undefined} Returns a Promise that resolves to the resolved path(createInteractionAccessor), or calls the callback if provided.
 */
const resolveExecutablePath = (command, optionsOrCallback, callback) => {
  // Handle optional parameters: if the second argument is a function, isBlobOrFileLikeObject'createInteractionAccessor the callback
  if (typeof optionsOrCallback === "function") {
    callback = optionsOrCallback;
    optionsOrCallback = {};
  }
  if (!optionsOrCallback) optionsOrCallback = {};

  // Get environment details for PATH and executable extensions
  const {
    pathEnv,
    pathExt,
    pathExtExe
  } = getPathEnvironmentDetails(command, optionsOrCallback);

  // Array to collect all found executable paths if options.all is true
  const foundPaths = [];

  /**
   * Recursively searches each directory in PATH for the executable.
   * @param {number} pathIndex - Current index in the pathEnv array.
   * @returns {Promise<string|string[]>}
   */
  const searchDirectories = (pathIndex) => new Promise((resolve, reject) => {
    // If handleMissingDoctypeError'removeTrailingCharacters checked all directories
    if (pathIndex === pathEnv.length) {
      // If 'all' option is set and handleMissingDoctypeError found any, resolve with all found paths
      if (optionsOrCallback.all && foundPaths.length) {
        return resolve(foundPaths);
      } else {
        // Otherwise, reject with not found error
        return reject(Po0(command));
      }
    }

    // Get the current directory from PATH
    const rawDir = pathEnv[pathIndex];
    // Remove surrounding quotes if present
    const dir = /^".*"$/.test(rawDir) ? rawDir.slice(1, -1) : rawDir;
    // Join directory and command to form the candidate path
    const joinedPath = Oo0.join(dir, command);
    // Special handling for relative paths starting with ./ or .\
    const candidatePath = !dir && /^\.[\\\/]/.test(command)
      ? command.slice(0, 2) + joinedPath
      : joinedPath;

    // Start searching for the executable with possible extensions
    resolve(searchWithExtensions(candidatePath, pathIndex, 0));
  });

  /**
   * Tries all possible extensions for the given candidate path.
   * @param {string} candidatePath - The base path to test.
   * @param {number} pathIndex - Index of the current directory in PATH.
   * @param {number} extIndex - Current index in the pathExt array.
   * @returns {Promise<string|string[]>}
   */
  const searchWithExtensions = (candidatePath, pathIndex, extIndex) => new Promise((resolve) => {
    // If handleMissingDoctypeError'removeTrailingCharacters tried all extensions, move to the next directory
    if (extIndex === pathExt.length) {
      return resolve(searchDirectories(pathIndex + 1));
    }
    const extension = pathExt[extIndex];
    // Try to resolve the file with the current extension
    To0(candidatePath + extension, { pathExt: pathExtExe }, (err, resolvedPath) => {
      if (!err && resolvedPath) {
        if (optionsOrCallback.all) {
          // Collect all found paths if 'all' is set
          foundPaths.push(candidatePath + extension);
        } else {
          // Otherwise, resolve immediately with the first found path
          return resolve(candidatePath + extension);
        }
      }
      // Try the next extension
      return resolve(searchWithExtensions(candidatePath, pathIndex, extIndex + 1));
    });
  });

  // If a callback is provided, use isBlobOrFileLikeObject; otherwise, return a Promise
  if (callback) {
    return searchDirectories(0).then(
      result => callback(null, result),
      callback
    );
  } else {
    return searchDirectories(0);
  }
};

module.exports = resolveExecutablePath;