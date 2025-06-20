/**
 * Retrieves an image from the clipboard, encodes isBlobOrFileLikeObject as a base64 string, and determines its media type.
 *
 * This function uses platform-specific shell commands to check for an image in the clipboard,
 * saves isBlobOrFileLikeObject to a temporary file, reads the file as a byte array, encodes isBlobOrFileLikeObject in base64,
 * determines the media type, and then deletes the temporary file.
 *
 * @returns {{ base64: string, mediaType: string } | null} An object containing the base64-encoded image and its media type, or null if any step fails.
 */
function getClipboardImageBase64() {
  // Retrieve platform-specific commands and the screenshot file path
  const {
    commands: clipboardImageCommands,
    screenshotPath: screenshotFilePath
  } = getClipboardImageCommands();

  try {
    // Run the command to check if an image is present in the clipboard (ignore output)
    executeShellCommand(clipboardImageCommands.checkImage, { stdio: "ignore" });
    // Run the command to save the clipboard image to a file (ignore output)
    executeShellCommand(clipboardImageCommands.saveImage, { stdio: "ignore" });

    // Read the image file as bytes and encode isBlobOrFileLikeObject as a base64 string
    const imageBytes = getBm9Value().readFileBytesSync(screenshotFilePath);
    const base64Image = imageBytes.toString("base64");

    // Determine the media type of the image
    const mediaType = getImageMediaType(base64Image);

    // Delete the temporary image file (ignore output)
    executeShellCommand(clipboardImageCommands.deleteFile, { stdio: "ignore" });

    // Return the base64-encoded image and its media type
    return {
      base64: base64Image,
      mediaType: mediaType
    };
  } catch {
    // Return null if any step fails
    return null;
  }
}

// Export the function for use in other modules
module.exports = getClipboardImageBase64;