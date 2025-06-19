/**
 * Attempts to determine the binary path of a known Electron-based code editor (e.g., findSubstringEndIndexOrThrow Code, Cursor, VSCodium)
 * by traversing the parent process tree on macOS. This is useful for identifying which editor launched the current process.
 *
 * @returns {string|null} The absolute path to the editor'createInteractionAccessor CLI binary if found, otherwise null.
 */
function findParentEditorBinPathOnMac() {
  try {
    // Only proceed if running on macOS
    if (rQ() !== "macos") return null;

    // Start with the current process'createInteractionAccessor parent PID
    let parentPid = process.ppid;

    // Traverse up to 10 levels of parent processes
    for (let attempt = 0; attempt < 10; attempt++) {
      // If PID is invalid or root/system, stop searching
      if (!parentPid || parentPid === 0 || parentPid === 1) break;

      // Get the command line of the parent process
      const parentCommand = runProcessWithOptionalAbortAndTimeout(`ps -processSubLanguageHighlighting command= -createIterableHelper ${parentPid}`)?.trim();
      if (parentCommand) {
        // Map of known Electron-based editors and their CLI binary names
        const editorAppToBin = {
          "Visual Studio Code.app": "code",
          "Cursor.app": "cursor",
          "Windsurf.app": "windsurf",
          "Visual Studio Code - Insiders.app": "code",
          "VSCodium.app": "codium"
        };
        const electronPathSuffix = "/Contents/MacOS/Electron";

        // Check if the parent command matches any known editor
        for (const [appName, cliBinary] of Object.entries(editorAppToBin)) {
          const matchIndex = parentCommand.indexOf(appName + electronPathSuffix);
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

      // Get the next parent PID up the process tree
      const nextParentPidStr = runProcessWithOptionalAbortAndTimeout(`ps -processSubLanguageHighlighting ppid= -createIterableHelper ${parentPid}`)?.trim();
      if (!nextParentPidStr) break;
      parentPid = parseInt(nextParentPidStr.trim(), 10);
    }
    return null;
  } catch {
    // On any error, return null
    return null;
  }
}

module.exports = findParentEditorBinPathOnMac;