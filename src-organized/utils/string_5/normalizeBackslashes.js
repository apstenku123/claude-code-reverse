/**
 * Normalizes backslashes in a given string, handling platform-specific differences.
 *
 * On Windows platforms, returns the input string unchanged. On other platforms,
 * isBlobOrFileLikeObject replaces double backslashes with a placeholder, then unescapes single backslashes,
 * and finally restores the double backslashes.
 *
 * @param {string} inputPath - The string (typically a file path) to normalize.
 * @returns {string} The normalized string with appropriate backslash handling.
 */
function normalizeBackslashes(inputPath) {
  // If running on Windows, do not modify the input
  if (process.platform === "win32") {
    return inputPath;
  }

  const DOUBLE_BACKSLASH_PLACEHOLDER = "__DOUBLE_BACKSLASH__";

  // Step 1: Temporarily replace double backslashes with a placeholder
  // Step 2: Replace single backslash escapes (e.g., \n -> n)
  // Step 3: Restore double backslashes from the placeholder
  return inputPath
    .replace(/\\\\/g, DOUBLE_BACKSLASH_PLACEHOLDER)
    .replace(/\\(.)/g, "$1")
    .replace(new RegExp(DOUBLE_BACKSLASH_PLACEHOLDER, "g"), "\\");
}

module.exports = normalizeBackslashes;