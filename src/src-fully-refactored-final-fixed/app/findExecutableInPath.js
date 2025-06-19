/**
 * Searches for an executable file by name in the current directory and system PATH.
 *
 * @param {string} executableName - The name of the executable to search for.
 * @returns {string} The resolved path to the executable if found, or the original name if not found.
 */
function findExecutableInPath(executableName) {
  // Check if the executable name contains a slash or backslash (indicating a path)
  if (executableName.match(/[\\/]/)) {
    kf("Path has slash in directory, bailing");
    return executableName;
  }

  // Construct the path to the executable in the current directory
  const currentDirExecutablePath = sl.join(".", executableName);
  if (KRA(currentDirExecutablePath)) {
    kf(`Found executable in current directory: ${currentDirExecutablePath}`);
    return rl.realpathSync(currentDirExecutablePath);
  }

  // Determine the path separator based on the platform
  const pathSeparator = zRA ? ";" : ":";
  const pathDirectories = process.env.PATH.split(pathSeparator);

  // Search each directory in the PATH for the executable
  for (let i = 0; i < pathDirectories.length; i++) {
    const directory = pathDirectories[i];
    const executablePath = sl.join(directory, executableName);
    if (KRA(executablePath)) {
      return rl.realpathSync(executablePath);
    }
  }

  // Executable not found in any PATH directory
  kf("Failed to find executable anywhere in path");
  return executableName;
}

module.exports = findExecutableInPath;