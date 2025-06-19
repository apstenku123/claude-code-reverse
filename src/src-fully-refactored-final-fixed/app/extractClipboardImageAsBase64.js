/**
 * Extracts an image from the system clipboard, encodes isBlobOrFileLikeObject as a base64 string, and determines its media type.
 * Utilizes platform-specific shell commands to interact with the clipboard and file system.
 *
 * @returns {{ base64: string, mediaType: string } | null} An object containing the base64-encoded image and its media type, or null if extraction fails.
 */
function extractClipboardImageAsBase64() {
  // Retrieve platform-specific commands and screenshot file path
  const {
    commands: clipboardImageCommands,
    screenshotPath
  } = getClipboardImageCommands();

  try {
    // Ensure the clipboard image exists and is saved to disk (ignore output)
    executeShellCommand(clipboardImageCommands.checkImage, { stdio: "ignore" });
    executeShellCommand(clipboardImageCommands.saveImage, { stdio: "ignore" });

    // Read the saved image file as a Buffer and convert to base64 string
    const imageBuffer = fileSystem().readFileBytesSync(screenshotPath);
    const base64Image = imageBuffer.toString("base64");

    // Determine the media type (e.g., 'image/png') from the base64 string
    const mediaType = getImageMediaType(base64Image);

    // Clean up: delete the temporary screenshot file (ignore output)
    executeShellCommand(clipboardImageCommands.deleteFile, { stdio: "ignore" });

    return {
      base64: base64Image,
      mediaType: mediaType
    };
  } catch {
    // If any step fails, return null
    return null;
  }
}

module.exports = extractClipboardImageAsBase64;