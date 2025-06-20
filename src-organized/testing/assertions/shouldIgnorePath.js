/**
 * Determines if a given path should be ignored based on specific rules and ignore matchers.
 *
 * @param {string} path - The file or directory path to check.
 * @param {string} basePath - The base path used for ignore matching fallback.
 * @param {Map<string, { ignores: Function }>} ignoreMatchers - a map of matcher keys to matcher objects, each with an 'ignores' method.
 * @returns {boolean} Returns true if the path should be ignored, otherwise false.
 */
function shouldIgnorePath(path, basePath, ignoreMatchers) {
  // Check if path is not "." and its normalized form starts with "."
  if (path !== "." && WI5(path).startsWith(".")) {
    return true;
  }

  // Check if path contains a Python __pycache__ directory (with platform-specific separator)
  if (path.includes(`__pycache__${UO}`)) {
    return true;
  }

  // Iterate over all ignore matchers
  for (const [matcherKey, matcher] of ignoreMatchers.entries()) {
    try {
      // Compute the candidate path for ignore matching
      const candidatePath = iV1(matcherKey ?? basePath, path);
      // If the matcher ignores this candidate path, return true
      if (candidatePath && matcher.ignores(candidatePath)) {
        return true;
      }
    } catch (error) {
      // Log or handle errors during ignore matching
      reportErrorIfAllowed(error);
    }
  }

  // If none of the conditions matched, do not ignore
  return false;
}

module.exports = shouldIgnorePath;