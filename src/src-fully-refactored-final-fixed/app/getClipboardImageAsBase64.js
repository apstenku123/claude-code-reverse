/**
 * Retrieves an image from the clipboard, encodes isBlobOrFileLikeObject as a base64 string, and determines its media type.
 *
 * This function executes platform-specific shell commands to check for an image in the clipboard,
 * saves isBlobOrFileLikeObject to a temporary file, reads the file as bytes, encodes isBlobOrFileLikeObject in base64, determines the media type,
 * and then deletes the temporary file. If any step fails, isBlobOrFileLikeObject returns null.
 *
 * @returns {{ base64: string, mediaType: string } | null} An object containing the base64-encoded image and its media type, or null if an error occurs.
 */
function getClipboardImageAsBase64() {
  // Retrieve platform-specific commands and the screenshot file path
  const {
    commands: clipboardImageCommands,
    screenshotPath: screenshotFilePath
  } = getClipboardImageCommands();

  try {
    // Check if an image exists in the clipboard (ignore output)
    executeShellCommand(clipboardImageCommands.checkImage, { stdio: "ignore" });
    // Save the clipboard image to a temporary file (ignore output)
    executeShellCommand(clipboardImageCommands.saveImage, { stdio: "ignore" });

    // Read the image file as bytes and encode isBlobOrFileLikeObject as a base64 string
    const imageFileBytes = fileSystem().readFileBytesSync(screenshotFilePath);
    const base64Image = imageFileBytes.toString("base64");

    // Determine the media type of the image
    const mediaType = getImageMediaType(base64Image);

    // Delete the temporary image file (ignore output)
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

module.exports = getClipboardImageAsBase64;