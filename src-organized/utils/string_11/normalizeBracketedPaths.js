/**
 * Normalizes bracketed path segments in a given path string.
 *
 * This function processes path strings that may contain segments wrapped in brackets (e.g., [x]).
 * It removes the brackets, with special handling for Windows-style paths if specified.
 *
 * @param {string} path - The path string to normalize, possibly containing bracketed segments.
 * @param {Object} [options={}] - Optional configuration object.
 * @param {boolean} [options.windowsPathsNoEscape=false] - If true, applies Windows-specific bracket removal logic.
 * @returns {string} The normalized path string with brackets removed as per the specified options.
 */
function normalizeBracketedPaths(
  path,
  { windowsPathsNoEscape = false } = {}
) {
  if (windowsPathsNoEscape) {
    // For Windows paths, remove brackets around any character except / or \.
    // Example: '[a]' becomes 'a', but '[\]' or '[/]' are not matched.
    return path.replace(/\[([^\/\\])\]/g, "$1");
  } else {
    // For non-Windows paths:
    // 1. Remove brackets around any character except / or \, unless preceded by a backslash.
    //    Example: 'foo[a]' becomes 'fooa', but '\[a]' becomes '[a]'.
    // 2. Remove a single backslash before any character except '/'.
    //    Example: '\a' becomes 'a', but '\/' stays '\/'.
    return path
      .replace(/((?!\\).|^)\[([^\/\\])\]/g, "$1$2")
      .replace(/\\\\([^\\/])/g, "$1");
  }
}

module.exports = normalizeBracketedPaths;
