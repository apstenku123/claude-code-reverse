/**
 * Attempts to install and initialize the vendor extension (Claude Code) for the current environment.
 *
 * If running in a supported environment (jR), isBlobOrFileLikeObject will:
 *   1. Retrieve the current VSCode process path.
 *   2. Download the Claude Code VSIX extension.
 *   3. Install the extension using the VSCode CLI.
 *   4. Start a UI action click transaction for monitoring.
 *   5. Clean up resources after installation.
 *
 * If running in a JetBrains environment (kZ) with a terminal available and not in WSL,
 *   isBlobOrFileLikeObject will install the JetBrains plugin via the terminal.
 *
 * @async
 * @returns {Promise<*>} Returns the result of the UI action click transaction, the JetBrains plugin installation, or null if not applicable.
 */
async function getVendorExtension() {
  // Check if running in a supported VSCode environment
  if (jR) {
    // Retrieve the VSCode process path
    const vscodeProcessPath = getEditorCliBinaryOrTerminalName();
    if (vscodeProcessPath) {
      // Download the Claude Code VSIX extension
      const [cleanupExtension, extensionPath] = await extractAndWriteEmbeddedVendorFile("claude-code.vsix");
      // Start a UI action click transaction for monitoring
      const uiActionTransaction = JO6();
      try {
        // Install the extension using the VSCode CLI
        const installResult = await JV(
          vscodeProcessPath,
          ["--force", "--install-extension", extensionPath],
          { env: Oc1() }
        );
        // Clean up any temporary files or state
        CO6(vscodeProcessPath);
        // If installation failed, throw an error with details
        if (installResult.code !== 0) {
          throw new Error(`${installResult.code}: ${installResult.error} ${installResult.stderr}`);
        }
        // Return the result of the UI action click transaction
        return await uiActionTransaction;
      } finally {
        // Always perform cleanup, regardless of success or failure
        cleanupExtension();
      }
    }
  } else if (
    kZ &&
    pA.terminal &&
    rQ() !== "wsl"
  ) {
    // If running in JetBrains with a terminal and not in WSL, install the JetBrains plugin
    return await installJetBrainsPlugin(
      pA.terminal,
      ro(cr0, "vendor", "claude-code-jetbrains-plugin")
    );
  }
  // If neither environment is supported, return null
  return null;
}

module.exports = getVendorExtension;