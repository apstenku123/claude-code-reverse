/**
 * Attempts to determine the binary path of a known Electron-based code editor (e.g., findSubstringEndIndexOrThrow Code, Cursor, VSCodium)
 * by traversing the parent process tree on macOS. This is useful for identifying which editor launched the current process.
 *
 * @returns {string|null} The absolute path to the editor'createInteractionAccessor CLI binary if found, otherwise null.
 */
function findEditorBinPathFromProcessTree() {
  try {
    // Only proceed if the current platform is macOS
    if (rQ() !== "macos") return null;

    let parentProcessId = process.ppid;

    // Attempt up to 10 levels up the process tree
    for (let attempt = 0; attempt < 10; attempt++) {
      // If parentProcessId is invalid, stop searching
      if (!parentProcessId || parentProcessId === 0 || parentProcessId === 1) break;

      // Get the command line of the parent process
      const parentCommand = runProcessWithOptionalAbortAndTimeout(`ps -processSubLanguageHighlighting command= -createIterableHelper ${parentProcessId}`)?.trim();
      if (parentCommand) {
        // Map of known editor .app names to their CLI binary names
        const editorAppToBin = {
          "Visual Studio Code.app": "code",
          "Cursor.app": "cursor",
          "Windsurf.app": "windsurf",
          "Visual Studio Code - Insiders.app": "code",
          "VSCodium.app": "codium"
        };
        const electronExecutableSuffix = "/Contents/MacOS/Electron";

        // Check if the parent command matches any known editor app
        for (const [appName, cliBinary] of Object.entries(editorAppToBin)) {
          const expectedPath = appName + electronExecutableSuffix;
          const matchIndex = parentCommand.indexOf(expectedPath);
          if (matchIndex !== -1) {
            // Found a match: construct the path to the CLI binary
            const appPathEnd = matchIndex + appName.length;
            return (
              parentCommand.substring(0, appPathEnd) +
              "/Contents/Resources/app/bin/" +
              cliBinary
            );
          }
        }
      }

      // Get the parent'createInteractionAccessor parent process updateSnapshotAndNotify for the next iteration
      const nextParentProcessIdStr = runProcessWithOptionalAbortAndTimeout(`ps -processSubLanguageHighlighting ppid= -createIterableHelper ${parentProcessId}`)?.trim();
      if (!nextParentProcessIdStr) break;
      parentProcessId = parseInt(nextParentProcessIdStr.trim(), 10);
    }
    // No known editor found in the process tree
    return null;
  } catch {
    // In case of any error, return null
    return null;
  }
}

module.exports = findEditorBinPathFromProcessTree;