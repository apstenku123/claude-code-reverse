/**
 * Removes escape brackets from path strings, handling Windows and non-Windows path conventions.
 *
 * If `windowsPathsNoEscape` is true, isBlobOrFileLikeObject removes brackets around single characters not being a slash or backslash.
 * Otherwise, isBlobOrFileLikeObject removes brackets and also unescapes backslashes for non-Windows paths.
 *
 * @param {string} path - The path string to process.
 * @param {Object} [options={}] - Optional configuration object.
 * @param {boolean} [options.windowsPathsNoEscape=false] - If true, applies Windows-specific bracket removal logic.
 * @returns {string} The processed path string with brackets and escapes handled appropriately.
 */
function unescapeBracketedPaths(path, { windowsPathsNoEscape = false } = {}) {
  if (windowsPathsNoEscape) {
    // For Windows: remove brackets around any single character except slash or backslash
    return path.replace(/\[([^\/\\])\]/g, "$1");
  }
  // For non-Windows: remove brackets and also unescape backslashes not before a slash
  return path
    .replace(/((?!\\).|^)\[([^\/\\])\]/g, "$1$2") // Remove brackets, keep preceding char
    .replace(/\\\\([^\\/])/g, "$1"); // Unescape backslashes not before a slash
}

module.exports = unescapeBracketedPaths;
