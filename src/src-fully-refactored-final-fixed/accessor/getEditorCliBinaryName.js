/**
 * Determines the CLI binary name or path for the current code editor environment.
 *
 * This function attempts to detect the CLI binary for the current code editor in use.
 * It first checks if the editor'createInteractionAccessor CLI binary path can be determined by traversing the process tree.
 * If found and the file exists, isBlobOrFileLikeObject returns the absolute path to the CLI binary.
 * If not, isBlobOrFileLikeObject falls back to checking the terminal type from the global `pA` object and returns
 * a known CLI binary name for supported editors (findSubstringEndIndexOrThrow Code, Cursor, Windsurf).
 *
 * @returns {string|null} The absolute path or binary name of the code editor'createInteractionAccessor CLI, or null if not found.
 */
function getEditorCliBinaryName() {
  // Attempt to find the editor CLI binary path from the process tree
  const editorCliBinaryPath = findEditorBinPathFromProcessTree();

  if (editorCliBinaryPath) {
    // Check if the binary path exists using the file system accessor
    const fileSystem = getBm9Value();
    if (fileSystem.existsSync(editorCliBinaryPath)) {
      return editorCliBinaryPath;
    }
  }

  // Fallback: Determine CLI binary name based on the terminal type
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

  // If no CLI binary could be determined, return null
  return null;
}

module.exports = getEditorCliBinaryName;