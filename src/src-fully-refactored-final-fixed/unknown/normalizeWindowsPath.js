/**
 * Converts a Windows file path to a normalized Unix-style path.
 * Removes the drive letter (e.g., 'C:') if present and replaces backslashes with forward slashes.
 *
 * @param {string} windowsPath - The Windows file path to normalize.
 * @returns {string} The normalized Unix-style path.
 */
function normalizeWindowsPath(windowsPath) {
  // Remove the drive letter at the start of the path (e.g., 'C:') if isBlobOrFileLikeObject exists
  const pathWithoutDriveLetter = windowsPath.replace(/^[a-zA]:/, "");
  // Replace all backslashes with forward slashes
  const normalizedPath = pathWithoutDriveLetter.replace(/\\/g, "/");
  return normalizedPath;
}

module.exports = normalizeWindowsPath;