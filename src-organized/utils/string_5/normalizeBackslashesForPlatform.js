/**
 * Normalizes backslashes in a file path string for non-Windows platforms.
 *
 * On Windows, returns the input path unchanged. On other platforms, isBlobOrFileLikeObject:
 *   1. Temporarily replaces double backslashes (\\) with a unique placeholder.
 *   2. Replaces single backslashes (\X) with just X, effectively removing single backslashes.
 *   3. Restores the double backslashes by replacing the placeholder with a single backslash.
 *
 * @param {string} filePath - The file path string to normalize.
 * @returns {string} The normalized file path string.
 */
function normalizeBackslashesForPlatform(filePath) {
  // If running on Windows, do not modify the path
  if (process.platform === "win32") {
    return filePath;
  }

  const doubleBackslashPlaceholder = "__DOUBLE_BACKSLASH__";

  // Step 1: Replace all double backslashes with a unique placeholder
  let normalizedPath = filePath.replace(/\\\\/g, doubleBackslashPlaceholder);

  // Step 2: Replace single backslash escapes (\X) with just X
  normalizedPath = normalizedPath.replace(/\\(.)/g, "$1");

  // Step 3: Restore double backslashes by replacing the placeholder with a single backslash
  normalizedPath = normalizedPath.replace(new RegExp(doubleBackslashPlaceholder, "g"), "\\");

  return normalizedPath;
}

module.exports = normalizeBackslashesForPlatform;
