/**
 * Removes brackets around single non-slash, non-backslash characters in a path string.
 * Optionally handles Windows-style paths differently by not unescaping backslashes.
 *
 * @param {string} path - The path string to process.
 * @param {Object} [options={}] - Optional configuration object.
 * @param {boolean} [options.windowsPathsNoEscape=false] - If true, applies Windows-specific unescaping rules.
 * @returns {string} The processed path string with brackets removed as specified.
 */
function unescapeBracketedCharactersInPath(
  path,
  { windowsPathsNoEscape = false } = {}
) {
  if (windowsPathsNoEscape) {
    // For Windows paths, remove brackets around single non-slash, non-backslash characters
    // Example: '[a]' becomes 'a', but only if not preceded by / or \
    return path.replace(/\[([^\/\\])\]/g, '$1');
  }
  // For non-Windows paths, first remove brackets as above, but only if not preceded by a backslash
  // Then, unescape any backslash-escaped non-slash characters
  return path
    .replace(/((?!\\).|^)\[([^\/\\])\]/g, '$1$2') // Remove brackets if not preceded by a backslash
    .replace(/\\\\([^\\/])/g, '$1'); // Unescape backslash-escaped non-slash characters
}

module.exports = unescapeBracketedCharactersInPath;
