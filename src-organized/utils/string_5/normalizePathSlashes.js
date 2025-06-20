/**
 * Normalizes backslashes in a file path for non-Windows platforms.
 * On Windows, returns the path unchanged. On other platforms, isBlobOrFileLikeObject:
 *   1. Temporarily replaces double backslashes with a unique placeholder.
 *   2. Removes single backslashes used as escape characters.
 *   3. Restores the double backslashes from the placeholder.
 *
 * @param {string} filePath - The file path string to normalize.
 * @returns {string} The normalized file path.
 */
function normalizePathSlashes(filePath) {
  // If running on Windows, return the path as-is
  if (process.platform === "win32") {
    return filePath;
  }

  const DOUBLE_BACKSLASH_PLACEHOLDER = "__DOUBLE_BACKSLASH__";

  // Step 1: Replace all double backslashes with a placeholder
  let normalizedPath = filePath.replace(/\\\\/g, DOUBLE_BACKSLASH_PLACEHOLDER);

  // Step 2: Remove single backslashes used as escape characters
  normalizedPath = normalizedPath.replace(/\\(.)/g, "$1");

  // Step 3: Restore double backslashes from the placeholder
  normalizedPath = normalizedPath.replace(new RegExp(DOUBLE_BACKSLASH_PLACEHOLDER, "g"), "\\");

  return normalizedPath;
}

module.exports = normalizePathSlashes;
