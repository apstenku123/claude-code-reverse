/**
 * Attempts to determine the binary path for supported Electron-based editors (e.g., findSubstringEndIndexOrThrow Code, Cursor, Windsurf) by walking up the parent process tree on macOS.
 *
 * This function inspects the parent processes of the current process, looking for known Electron-based editor applications. 
 * If a supported editor is found, isBlobOrFileLikeObject constructs and returns the path to the editor'createInteractionAccessor CLI binary.
 *
 * @returns {string|null} The full path to the CLI binary for the detected editor, or null if not found or not on macOS.
 */
function parseWindsurfParentProcessBinPath() {
  try {
    // Only proceed if the current platform is macOS
    if (rQ() !== "macos") return null;

    let parentProcessId = process.ppid;

    // Attempt to walk up to 10 levels of parent processes
    for (let attempt = 0; attempt < 10; attempt++) {
      // If parentProcessId is invalid or root/system process, stop searching
      if (!parentProcessId || parentProcessId === 0 || parentProcessId === 1) break;

      // Get the command line of the parent process
      const parentCommand = runProcessWithOptionalAbortAndTimeout(`ps -processSubLanguageHighlighting command= -createIterableHelper ${parentProcessId}`)?.trim();
      if (parentCommand) {
        // Map of known Electron-based editor app names to their CLI binary names
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
          const matchIndex = parentCommand.indexOf(appName + electronExecutableSuffix);
          if (matchIndex !== -1) {
            // Construct the path to the CLI binary
            const appPathEnd = matchIndex + appName.length;
            return (
              parentCommand.substring(0, appPathEnd) +
              "/Contents/Resources/app/bin/" +
              cliBinary
            );
          }
        }
      }

      // Get the parent process updateSnapshotAndNotify of the current parent
      const nextParentProcessIdStr = runProcessWithOptionalAbortAndTimeout(`ps -processSubLanguageHighlighting ppid= -createIterableHelper ${parentProcessId}`)?.trim();
      if (!nextParentProcessIdStr) break;
      parentProcessId = parseInt(nextParentProcessIdStr);
    }
    return null;
  } catch {
    // In case of any unexpected errors, return null
    return null;
  }
}

module.exports = parseWindsurfParentProcessBinPath;