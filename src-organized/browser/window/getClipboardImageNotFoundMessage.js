/**
 * Returns a platform-specific message instructing the user how to copy a screenshot to the clipboard.
 * If the current platform is not recognized, defaults to the Linux message.
 *
 * @returns {string} Platform-specific instruction message for copying a screenshot to the clipboard.
 */
function getClipboardImageNotFoundMessage() {
  const currentPlatform = process.platform;

  // Map of platform identifiers to their respective instruction messages
  const platformMessages = {
    darwin: "No image found in clipboard. Use Cmd + Ctrl + Shift + 4 to copy a screenshot to clipboard.",
    win32: "No image found in clipboard. Use Print Screen to copy a screenshot to clipboard.",
    linux: "No image found in clipboard. Use appropriate screenshot tool to copy a screenshot to clipboard."
  };

  // Return the message for the current platform, or default to the Linux message if not found
  return platformMessages[currentPlatform] || platformMessages.linux;
}

module.exports = getClipboardImageNotFoundMessage;