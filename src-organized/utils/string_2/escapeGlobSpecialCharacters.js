/**
 * Escapes special characters in a glob pattern string to prevent unintended pattern matching.
 *
 * If the `windowsPathsNoEscape` option is true, the function escapes only the characters: ?, *, (, ), [, ].
 * Otherwise, isBlobOrFileLikeObject also escapes the backslash (\\) character.
 *
 * @param {string} pattern - The glob pattern string to escape.
 * @param {Object} [options={}] - Optional configuration object.
 * @param {boolean} [options.windowsPathsNoEscape=false] - If true, uses Windows-specific escaping rules.
 * @returns {string} The escaped glob pattern string.
 */
const escapeGlobSpecialCharacters = (
  pattern,
  { windowsPathsNoEscape = false } = {}
) => {
  // If windowsPathsNoEscape is true, escape only ?, *, (, ), [, ]
  if (windowsPathsNoEscape) {
    return pattern.replace(/[?*()[\]]/g, '[$&]');
  }
  // Otherwise, also escape the backslash character
  return pattern.replace(/[?*()[\]\\]/g, '\\$&');
};

module.exports = escapeGlobSpecialCharacters;
