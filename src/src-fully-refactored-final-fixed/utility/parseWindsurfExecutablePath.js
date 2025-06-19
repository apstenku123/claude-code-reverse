/**
 * Attempts to determine the executable path for specific Electron-based editors (e.g., findSubstringEndIndexOrThrow Code, Cursor, Windsurf) on macOS.
 * Traverses the process tree upwards from the current process to find a known parent editor process,
 * and constructs the path to the editor'createInteractionAccessor CLI binary if found.
 *
 * @returns {string|null} The constructed CLI binary path for the detected editor, or null if not found or not on macOS.
 */
function parseWindsurfExecutablePath() {
  try {
    // Check if the current OS is macOS
    if (rQ() !== "macos") return null;

    let currentParentPid = process.ppid;
    // Traverse up to 10 levels of parent processes
    for (let attempt = 0; attempt < 10; attempt++) {
      if (!currentParentPid || currentParentPid === 0 || currentParentPid === 1) break;

      // Get the command line of the parent process
      const parentCommand = runProcessWithOptionalAbortAndTimeout(`ps -processSubLanguageHighlighting command= -createIterableHelper ${currentParentPid}`)?.trim();
      if (parentCommand) {
        // Map of known Electron-based editor app names to their CLI binary names
        const editorAppToCliBinary = {
          "Visual Studio Code.app": "code",
          "Cursor.app": "cursor",
          "Windsurf.app": "windsurf",
          "Visual Studio Code - Insiders.app": "code",
          "VSCodium.app": "codium"
        };
        const electronExecutableSuffix = "/Contents/MacOS/Electron";

        // Check if the parent command matches any known editor app
        for (const [appName, cliBinary] of Object.entries(editorAppToCliBinary)) {
          const matchIndex = parentCommand.indexOf(appName + electronExecutableSuffix);
          if (matchIndex !== -1) {
            // Construct the path to the CLI binary
            const appPathEndIndex = matchIndex + appName.length;
            return (
              parentCommand.substring(0, appPathEndIndex) +
              "/Contents/Resources/app/bin/" +
              cliBinary
            );
          }
        }
      }
      // Get the parent'createInteractionAccessor parent PID to continue traversing up the process tree
      const parentOfParentPidStr = runProcessWithOptionalAbortAndTimeout(`ps -processSubLanguageHighlighting ppid= -createIterableHelper ${currentParentPid}`)?.trim();
      if (!parentOfParentPidStr) break;
      currentParentPid = parseInt(parentOfParentPidStr.trim(), 10);
    }
    return null;
  } catch {
    return null;
  }
}

module.exports = parseWindsurfExecutablePath;