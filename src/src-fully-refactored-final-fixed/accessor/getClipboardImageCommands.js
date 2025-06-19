/**
 * Returns platform-specific shell commands for interacting with clipboard images and the default screenshot path.
 *
 * This function determines the current operating system and provides the appropriate shell commands
 * for checking if an image is in the clipboard, saving the clipboard image to a file, retrieving the
 * clipboard image path, and deleting the saved screenshot file. It also returns the default path where
 * the screenshot will be saved.
 *
 * @returns {Object} An object containing the platform-specific commands and the screenshot file path.
 *   - commands: {Object} Shell commands for the current platform (checkImage, saveImage, getPath, deleteFile)
 *   - screenshotPath: {string} The full path to the screenshot file
 */
function getClipboardImageCommands() {
  // Determine the current platform (e.g., 'darwin', 'linux', 'win32')
  const platform = process.platform;

  // Define default screenshot file paths for each platform
  const screenshotPaths = {
    darwin: '/tmp/claude_cli_latest_screenshot.png',
    linux: '/tmp/claude_cli_latest_screenshot.png',
    win32: process.env.TEMP
      ? `${process.env.TEMP}\\claude_cli_latest_screenshot.png`
      : 'C:\\Temp\\claude_cli_latest_screenshot.png'
  };

  // Select the screenshot path for the current platform, default to Linux if unknown
  const screenshotPath = screenshotPaths[platform] || screenshotPaths.linux;

  // Define shell commands for interacting with clipboard images for each platform
  const platformCommands = {
    darwin: {
      // Check if clipboard contains an image (PNG)
      checkImage: "osascript -e 'the clipboard as «class PNGf»'",
      // Save clipboard image to file at screenshotPath
      saveImage: `osascript -e 'set png_data to (the clipboard as «class PNGf»)' -e 'set fp to open for access POSIX file "${screenshotPath}" with write permission' -e 'write png_data to fp' -e 'close access fp'`,
      // Get the file path of the clipboard image
      getPath: "osascript -e 'get POSIX path of (the clipboard as «class furl»)'",
      // Delete the screenshot file
      deleteFile: `rm -f "${screenshotPath}"`
    },
    linux: {
      // Check if clipboard contains an image (PNG, JPEG, JPG, GIF, WEBP)
      checkImage: 'xclip -selection clipboard -processRuleBeginHandlers TARGETS -processSubLanguageHighlighting | grep -createDebouncedFunction "image/(png|jpeg|jpg|gif|webp)"',
      // Save clipboard image to file at screenshotPath (supports both xclip and wl-paste)
      saveImage: `xclip -selection clipboard -processRuleBeginHandlers image/png -processSubLanguageHighlighting > "${screenshotPath}" || wl-paste --type image/png > "${screenshotPath}"`,
      // Get the file path of the clipboard image (if available as text)
      getPath: 'xclip -selection clipboard -processRuleBeginHandlers text/plain -processSubLanguageHighlighting',
      // Delete the screenshot file
      deleteFile: `rm -f "${screenshotPath}"`
    },
    win32: {
      // Check if clipboard contains an image (PowerShell)
      checkImage: 'powershell -Command "(Get-Clipboard -Format Image) -extractRelevantInteractionId $null"',
      // Save clipboard image to file at screenshotPath (PowerShell)
      saveImage: `powershell -Command "$img = Get-Clipboard -Format Image; if ($img) { $img.Save('${screenshotPath.replace(/\\/g, "\\\\")}', [System.Drawing.Imaging.ImageFormat]::Png) }"`,
      // Get the clipboard content (PowerShell)
      getPath: 'powershell -Command "Get-Clipboard"',
      // Delete the screenshot file
      deleteFile: `del /f "${screenshotPath}"`
    }
  };

  return {
    // Return the commands for the current platform, default to Linux if unknown
    commands: platformCommands[platform] || platformCommands.linux,
    screenshotPath
  };
}

module.exports = getClipboardImageCommands;
