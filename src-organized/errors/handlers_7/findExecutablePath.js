/**
 * Searches for the full path(createInteractionAccessor) of an executable file in the system PATH, considering platform-specific extensions.
 *
 * @param {string} command - The name of the executable to search for (e.g., 'node', 'python').
 * @param {Object} [options={}] - Optional configuration object.
 * @param {boolean} [options.all=false] - If true, returns all matching paths; otherwise, returns the first found.
 * @param {boolean} [options.nothrow=false] - If true, returns null instead of throwing if not found.
 * @returns {string|string[]|null} The full path to the executable, an array of all matches if 'all' is true, or null if not found and 'nothrow' is true.
 * @throws {Error} Throws if the executable is not found and 'nothrow' is not set.
 */
function findExecutablePath(command, options = {}) {
  // Get PATH environment details and executable extensions
  const {
    pathEnv: pathDirectories,
    pathExt: executableExtensions,
    pathExtExe: executableExtensionForSync
  } = getPathEnvironmentDetails(command, options);

  const foundPaths = [];

  // Iterate over each directory in the PATH
  for (let dirIndex = 0; dirIndex < pathDirectories.length; dirIndex++) {
    const rawDirectory = pathDirectories[dirIndex];
    // Remove surrounding quotes if present
    const directory = /^".*"$/.test(rawDirectory)
      ? rawDirectory.slice(1, -1)
      : rawDirectory;
    // Join directory and command to form a candidate path
    const joinedPath = pathJoin(directory, command);
    // If directory is empty and command starts with './' or '.\', handle accordingly
    const candidateBasePath = !directory && /^\.[\\\/]/.test(command)
      ? command.slice(0, 2) + joinedPath
      : joinedPath;

    // Try each executable extension
    for (let extIndex = 0; extIndex < executableExtensions.length; extIndex++) {
      const candidatePath = candidateBasePath + executableExtensions[extIndex];
      try {
        // Check if the candidate path is an executable
        if (isExecutableSync(candidatePath, { pathExt: executableExtensionForSync })) {
          if (options.all) {
            foundPaths.push(candidatePath);
          } else {
            return candidatePath;
          }
        }
      } catch (error) {
        // Ignore errors and continue searching
      }
    }
  }

  // Return all found paths if requested
  if (options.all && foundPaths.length) {
    return foundPaths;
  }
  // Return null if not found and nothrow is set
  if (options.nothrow) {
    return null;
  }
  // Throw an error if not found
  throw buildNotFoundError(command);
}

// Export the function
module.exports = findExecutablePath;
