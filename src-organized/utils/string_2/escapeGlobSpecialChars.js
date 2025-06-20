/**
 * Escapes special characters in a glob pattern string so they are treated as literals.
 *
 * @param {string} pattern - The glob pattern string to escape.
 * @param {Object} [options={}] - Optional configuration object.
 * @param {boolean} [options.windowsPathsNoEscape=false] - If true, does not escape backslashes (for Windows paths).
 * @returns {string} The escaped glob pattern string.
 */
function escapeGlobSpecialChars(pattern, { windowsPathsNoEscape = false } = {}) {
  // If windowsPathsNoEscape is true, do not escape backslashes
  if (windowsPathsNoEscape) {
    // Escape glob special characters: ?, *, (, ), [, ]
    // Wrap each special character in square brackets to treat them as literals
    return pattern.replace(/[?*()[\]]/g, "[$&]");
  } else {
    // Escape glob special characters: ?, *, (, ), [, ], and \
    // Prepend a backslash to each special character
    return pattern.replace(/[?*()[\]\\]/g, "\\$&");
  }
}

module.exports = escapeGlobSpecialChars;
