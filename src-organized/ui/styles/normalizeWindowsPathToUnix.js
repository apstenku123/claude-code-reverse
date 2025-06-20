/**
 * Converts a Windows-style file path to a Unix-style path.
 *
 * This function removes the drive letter (e.g., 'C:') from the beginning of the path,
 * and replaces all backslashes ('\\') with forward slashes ('/').
 *
 * @param {string} windowsPath - The file path in Windows format.
 * @returns {string} The normalized file path in Unix format (without drive letter).
 */
function normalizeWindowsPathToUnix(windowsPath) {
  // Remove the drive letter (e.g., 'C:') from the start of the path, if present
  const pathWithoutDriveLetter = windowsPath.replace(/^[a-zA]:/, "");

  // Replace all backslashes with forward slashes
  const unixStylePath = pathWithoutDriveLetter.replace(/\\/g, "/");

  return unixStylePath;
}

module.exports = normalizeWindowsPathToUnix;