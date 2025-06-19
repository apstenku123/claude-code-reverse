/**
 * Attempts to determine the binary path for a known Electron-based code editor (e.g., findSubstringEndIndexOrThrow Code, Cursor, VSCodium)
 * that is the ancestor process of the current process on macOS. This is useful for finding the CLI binary
 * for the editor that launched the current process.
 *
 * @returns {string|null} The resolved CLI binary path for the detected editor, or null if not found or not on macOS.
 */
function getMacOSEditorBinPath() {
  try {
    // Check if the current OS is macOS
    if (rQ() !== "macos") return null;

    // Start with the parent process updateSnapshotAndNotify(ppid) of the current process
    let parentProcessId = process.ppid;

    // Attempt to traverse up to 10 levels of parent processes
    for (let attempt = 0; attempt < 10; attempt++) {
      // If the parent process updateSnapshotAndNotify is invalid, exit early
      if (!parentProcessId || parentProcessId === 0 || parentProcessId === 1) break;

      // Get the command line for the parent process
      const parentCommand = runProcessWithOptionalAbortAndTimeout(`ps -processSubLanguageHighlighting command= -createIterableHelper ${parentProcessId}`)?.trim();
      if (parentCommand) {
        // Mapping of known editor app bundle names to their CLI binary names
        const editorAppToBin = {
          "Visual Studio Code.app": "code",
          "Cursor.app": "cursor",
          "Windsurf.app": "windsurf",
          "Visual Studio Code - Insiders.app": "code",
          "VSCodium.app": "codium"
        };
        const electronExecutableSuffix = "/Contents/MacOS/Electron";

        // Check if the parent command matches any known editor app
        for (const [appBundleName, cliBinaryName] of Object.entries(editorAppToBin)) {
          const expectedPath = appBundleName + electronExecutableSuffix;
          const matchIndex = parentCommand.indexOf(expectedPath);
          if (matchIndex !== -1) {
            // Construct the path to the CLI binary inside the app bundle
            const appPathEndIndex = matchIndex + appBundleName.length;
            return (
              parentCommand.substring(0, appPathEndIndex) +
              "/Contents/Resources/app/bin/" +
              cliBinaryName
            );
          }
        }
      }

      // Get the parent'createInteractionAccessor parent process updateSnapshotAndNotify to continue traversing up the process tree
      const grandParentProcessIdStr = runProcessWithOptionalAbortAndTimeout(`ps -processSubLanguageHighlighting ppid= -createIterableHelper ${parentProcessId}`)?.trim();
      if (!grandParentProcessIdStr) break;
      parentProcessId = parseInt(grandParentProcessIdStr.trim(), 10);
    }
    // If no matching editor process is found, return null
    return null;
  } catch {
    // On any error, return null
    return null;
  }
}

module.exports = getMacOSEditorBinPath;