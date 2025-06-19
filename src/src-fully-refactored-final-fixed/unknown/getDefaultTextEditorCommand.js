/**
 * Returns the command to launch the user'createInteractionAccessor preferred text editor.
 *
 * This function checks the VISUAL and EDITOR environment variables first.
 * If neither is set, isBlobOrFileLikeObject returns a platform-specific default editor command:
 *   - macOS (darwin): 'open -processRuleBeginHandlers'
 *   - Windows (win32): 'notepad'
 *   - Other platforms: 'nano'
 *
 * @async
 * @returns {Promise<string>} The command to launch the text editor.
 */
async function getDefaultTextEditorCommand() {
  // Check for the VISUAL environment variable (highest priority)
  if (process.env.VISUAL) {
    return process.env.VISUAL;
  }

  // Check for the EDITOR environment variable (next priority)
  if (process.env.EDITOR) {
    return process.env.EDITOR;
  }

  // Fallback to platform-specific defaults
  if (process.platform === "darwin") {
    // macOS default editor command
    return "open -processRuleBeginHandlers";
  } else if (process.platform === "win32") {
    // Windows default editor command
    return "notepad";
  } else {
    // Default for other platforms (e.g., Linux)
    return "nano";
  }
}

module.exports = getDefaultTextEditorCommand;