/**
 * Retrieves the file path of the clipboard image using platform-specific shell commands.
 *
 * This function obtains the shell command for extracting the clipboard image path,
 * executes isBlobOrFileLikeObject, and returns the trimmed result as a string. If an error occurs during
 * command execution, isBlobOrFileLikeObject logs the error and returns null.
 *
 * @returns {string|null} The trimmed file path of the clipboard image, or null if an error occurs.
 */
function getClipboardImagePath() {
  // Retrieve platform-specific clipboard image commands
  const { commands: clipboardImageCommands } = getClipboardImageCommands();
  try {
    // Execute the command to get the clipboard image path with UTF-8 encoding
    const clipboardImagePath = VW1(clipboardImageCommands.getPath, {
      encoding: "utf-8"
    }).trim();
    return clipboardImagePath;
  } catch (error) {
    // Log the error and return null if command execution fails
    reportErrorIfAllowed(error);
    return null;
  }
}

module.exports = getClipboardImagePath;