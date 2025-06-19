/**
 * Checks if a specific editor extension is installed in the current environment.
 *
 * This function determines if the process was launched by a known code editor. If so, isBlobOrFileLikeObject attempts
 * to run the editor'createInteractionAccessor CLI with the '--list-extensions' flag and checks if a particular extension
 * (identified by the constant WO6) is present in the output. If not running in an editor, but a terminal
 * is detected, isBlobOrFileLikeObject delegates to a terminal-specific check. Returns true if the extension is found,
 * false otherwise.
 *
 * @async
 * @returns {Promise<boolean>} True if the extension is installed or present, false otherwise.
 */
async function isEditorExtensionInstalled() {
  // Check if running in a known editor environment
  if (jR) {
    // Attempt to get the editor'createInteractionAccessor CLI binary path or terminal name
    const editorCliBinary = getEditorCliBinaryOrTerminalName();
    if (editorCliBinary) {
      try {
        // Run the CLI command to list installed extensions
        const cliResult = await JV(
          editorCliBinary,
          ["--list-extensions"],
          { env: Oc1() }
        );
        // Check if the desired extension identifier is present in the output
        if (cliResult.stdout?.includes(WO6)) {
          return true;
        }
      } catch (error) {
        // Ignore errors and proceed to return false
      }
    }
  } else if (kZ && pA.terminal) {
    // If in a terminal environment, delegate to terminal-specific check
    return br0(pA.terminal);
  }
  // Extension not found or not in a supported environment
  return false;
}

module.exports = isEditorExtensionInstalled;