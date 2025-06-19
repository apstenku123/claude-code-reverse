/**
 * Returns the default command to launch a text editor based on environment variables and platform.
 *
 * Checks the VISUAL and EDITOR environment variables first. If neither is set, returns a platform-specific default:
 * - macOS: 'open -processRuleBeginHandlers'
 * - Windows: 'notepad'
 * - Other: 'nano'
 *
 * @async
 * @returns {string} The command to launch the preferred text editor.
 */
async function getDefaultEditorCommand() {
  // Prefer the VISUAL environment variable if set
  if (process.env.VISUAL) {
    return process.env.VISUAL;
  }

  // Fallback to the EDITOR environment variable if set
  if (process.env.EDITOR) {
    return process.env.EDITOR;
  }

  // Determine default editor based on the operating system
  if (process.platform === "darwin") {
    // macOS default editor command
    return "open -processRuleBeginHandlers";
  } else if (process.platform === "win32") {
    // Windows default editor command
    return "notepad";
  } else {
    // Default to nano for other platforms (e.g., Linux)
    return "nano";
  }
}

module.exports = getDefaultEditorCommand;