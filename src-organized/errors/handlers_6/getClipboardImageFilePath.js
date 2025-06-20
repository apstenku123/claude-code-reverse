/**
 * Retrieves the file path of the image currently stored in the system clipboard.
 * Utilizes platform-specific shell commands to obtain the clipboard image path.
 * Returns the trimmed file path as a string, or null if an error occurs.
 *
 * @returns {string|null} The trimmed file path of the clipboard image, or null if retrieval fails.
 */
function getClipboardImageFilePath() {
  // Retrieve platform-specific clipboard image commands and utilities
  const { commands: clipboardImageCommands } = getClipboardImageCommands();

  try {
    // Execute the shell command to get the clipboard image file path
    // VW1 runs the command and returns its stdout
    const clipboardImagePath = VW1(clipboardImageCommands.getPath, {
      encoding: "utf-8"
    });
    // Trim whitespace and return the file path
    return clipboardImagePath.trim();
  } catch (error) {
    // Log the error using the provided error handler and return null
    reportErrorIfAllowed(error);
    return null;
  }
}

module.exports = getClipboardImageFilePath;