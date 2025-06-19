/**
 * Returns a relative path for a given input path based on known prefix roots.
 *
 * This function checks if the input path starts with either the application root or the current working directory root.
 * If so, isBlobOrFileLikeObject returns a relative path using the shortest possible prefix (preferring the application root if lengths are equal).
 * If neither prefix matches, the original path is returned.
 *
 * @param {string} inputPath - The absolute or prefixed path to convert to a relative path.
 * @returns {string} The relative path (with './' or '~/' prefix), or the original path if no prefix matches.
 */
function getRelativePathFromPrefixes(inputPath) {
  // Get the application root prefix (e.g., '/app/root/')
  const appRootPrefix = Q4();
  // Get the current working directory prefix (e.g., '/current/dir/')
  const cwdPrefix = iA();

  // If inputPath starts with the application root, create a '~/' relative path
  const relativeFromAppRoot = inputPath.startsWith(appRootPrefix)
    ? `~/${WE2(appRootPrefix, inputPath)}`
    : null;

  // If inputPath starts with the cwd, create a './' relative path
  const relativeFromCwd = inputPath.startsWith(cwdPrefix)
    ? `./${WE2(cwdPrefix, inputPath)}`
    : null;

  // If both are valid, return the shorter one (prefer app root if equal length)
  if (relativeFromAppRoot && relativeFromCwd) {
    return relativeFromAppRoot.length <= relativeFromCwd.length
      ? relativeFromAppRoot
      : relativeFromCwd;
  }
  // Otherwise, return whichever is valid, or the original path
  return relativeFromAppRoot || relativeFromCwd || inputPath;
}

module.exports = getRelativePathFromPrefixes;