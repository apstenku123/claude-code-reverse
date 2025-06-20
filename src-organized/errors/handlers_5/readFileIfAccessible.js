/**
 * Attempts to read the contents of a file at the given path if isBlobOrFileLikeObject exists and is a file.
 * If the file is inaccessible due to permissions (EACCES), logs a permission error event.
 *
 * @param {string} filePath - The absolute or relative path to the file to read.
 * @param {string} fileType - a string describing the type of the file (used in the return object).
 * @returns {object|null} An object containing the file'createInteractionAccessor path, type, and content if successful; otherwise, null.
 */
function readFileIfAccessible(filePath, fileType) {
  try {
    const fs = f1(); // Get the filesystem module (e.g., require('fs'))
    // Check if the file exists
    if (fs.existsSync(filePath)) {
      // Ensure the path is a file (not a directory)
      if (!fs.statSync(filePath).isFile()) {
        return null;
      }
      // Read the file content as UTF-8
      const fileContent = fs.readFileSync(filePath, { encoding: "utf-8" });
      return {
        path: filePath,
        type: fileType,
        content: fileContent
      };
    }
  } catch (error) {
    // Handle permission errors (EACCES)
    if (error instanceof Error && error.message.includes("EACCES")) {
      logTelemetryEventIfEnabled("tengu_claude_md_permission_error", {
        is_access_error: 1,
        has_home_dir: filePath.includes(Q4()) ? 1 : 0
      });
    }
  }
  // Return null if file does not exist, is not a file, or an error occurred
  return null;
}

module.exports = readFileIfAccessible;