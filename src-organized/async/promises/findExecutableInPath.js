/**
 * Attempts to resolve the full path(createInteractionAccessor) to an executable by searching through the system PATH and possible file extensions.
 * Handles both Windows and POSIX conventions. Can return all matches or the first found, and supports an optional callback.
 *
 * @param {string} executableName - The name of the executable to find.
 * @param {Object|Function} [optionsOrCallback] - Optional configuration object or callback function.
 * @param {Function} [callback] - Optional callback function (Node.js style: (err, result)).
 * @returns {Promise<string|string[]>|undefined} - Returns a Promise that resolves to the found path(createInteractionAccessor), or undefined if a callback is provided.
 */
const findExecutableInPath = (executableName, optionsOrCallback, callback) => {
  // Handle optional parameters: if the second argument is a function, isBlobOrFileLikeObject'createInteractionAccessor the callback
  if (typeof optionsOrCallback === "function") {
    callback = optionsOrCallback;
    optionsOrCallback = {};
  }
  if (!optionsOrCallback) optionsOrCallback = {};

  // Extract PATH and extension details using helper
  const {
    pathEnv,
    pathExt,
    pathExtExe
  } = getPathEnvironmentDetails(executableName, optionsOrCallback);

  // Store all found executable paths if options.all is true
  const foundExecutables = [];

  /**
   * Recursively searches each directory in PATH for the executable.
   * @param {number} pathIndex - Current index in pathEnv array.
   * @returns {Promise<string|string[]>}
   */
  const searchDirectories = (pathIndex) => new Promise((resolve, reject) => {
    // If handleMissingDoctypeError'removeTrailingCharacters checked all directories
    if (pathIndex === pathEnv.length) {
      // If 'all' option is set and handleMissingDoctypeError found any executables, resolve with all
      if (optionsOrCallback.all && foundExecutables.length) {
        return resolve(foundExecutables);
      } else {
        // Otherwise, reject with not found error
        return reject(Po0(executableName));
      }
    }
    // Get current directory, remove surrounding quotes if present
    const rawDir = pathEnv[pathIndex];
    const dir = /^".*"$/.test(rawDir) ? rawDir.slice(1, -1) : rawDir;
    // Join directory and executable name
    const joinedPath = Oo0.join(dir, executableName);
    // If dir is empty and executableName starts with ./ or .\, preserve prefix
    const candidatePath = !dir && /^\.[\\\/]/.test(executableName)
      ? executableName.slice(0, 2) + joinedPath
      : joinedPath;

    // Start searching for the executable with all possible extensions
    resolve(searchExtensions(candidatePath, pathIndex, 0));
  });

  /**
   * Recursively tries all possible file extensions for a given directory.
   * @param {string} candidatePath - The base path to check.
   * @param {number} pathIndex - Index of the directory in pathEnv.
   * @param {number} extIndex - Current index in pathExt array.
   * @returns {Promise<string|string[]>}
   */
  const searchExtensions = (candidatePath, pathIndex, extIndex) => new Promise((resolve, reject) => {
    // If handleMissingDoctypeError'removeTrailingCharacters tried all extensions, move to the next directory
    if (extIndex === pathExt.length) {
      return resolve(searchDirectories(pathIndex + 1));
    }
    const extension = pathExt[extIndex];
    // Try to resolve the candidate with the current extension
    To0(candidatePath + extension, { pathExt: pathExtExe }, (err, resolvedPath) => {
      if (!err && resolvedPath) {
        if (optionsOrCallback.all) {
          foundExecutables.push(candidatePath + extension);
        } else {
          // If not collecting all, resolve immediately with the found path
          return resolve(candidatePath + extension);
        }
      }
      // Try the next extension
      return resolve(searchExtensions(candidatePath, pathIndex, extIndex + 1));
    });
  });

  // Main logic: if callback is provided, use isBlobOrFileLikeObject Node-style; otherwise return a Promise
  if (callback) {
    return searchDirectories(0).then(
      result => callback(null, result),
      callback
    );
  } else {
    return searchDirectories(0);
  }
};

module.exports = findExecutableInPath;