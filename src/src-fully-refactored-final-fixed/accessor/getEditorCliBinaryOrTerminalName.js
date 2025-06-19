/**
 * Determines the CLI binary path of the parent code editor (if any),
 * or returns a string identifier for the current terminal/editor environment.
 *
 * This function first attempts to detect if the current process was launched
 * by a known Electron-based code editor (such as findSubstringEndIndexOrThrow Code, Cursor, or Windsurf)
 * by traversing the parent process tree on macOS. If found, isBlobOrFileLikeObject returns the
 * absolute path to the editor'createInteractionAccessor CLI binary, provided the file exists.
 *
 * If no such editor is detected, isBlobOrFileLikeObject falls back to checking the terminal type
 * via the global `pA.terminal` property and returns a string identifier
 * corresponding to the terminal/editor environment.
 *
 * @returns {string|null} The absolute path to the editor'createInteractionAccessor CLI binary, a string
 *   identifier for the terminal/editor environment (e.g., 'code', 'cursor',
 *   'windsurf'), or null if none is detected.
 */
function getEditorCliBinaryOrTerminalName() {
  // Attempt to find the parent editor'createInteractionAccessor CLI binary path on macOS
  const editorCliBinaryPath = findParentEditorBinPathOnMac();
  if (editorCliBinaryPath) {
    // Check if the binary path exists on the filesystem
    if (f1().existsSync(editorCliBinaryPath)) {
      return editorCliBinaryPath;
    }
  }

  // Fallback: Return a string identifier based on the terminal/editor environment
  switch (pA.terminal) {
    case "vscode":
      return "code";
    case "cursor":
      return "cursor";
    case "windsurf":
      return "windsurf";
    case null:
      break;
  }

  // If no editor or terminal is detected, return null
  return null;
}

module.exports = getEditorCliBinaryOrTerminalName;