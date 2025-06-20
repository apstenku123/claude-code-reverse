/**
 * Installs the Claude Code extension for the current environment.
 *
 * If the environment supports direct extension installation (jR is true),
 * isBlobOrFileLikeObject attempts to install the VSCode extension using the provided helper functions.
 * If not, but a terminal is available and not running in WSL, isBlobOrFileLikeObject attempts to install
 * the JetBrains plugin variant via the terminal.
 *
 * @async
 * @returns {Promise<null|*>} Returns the result of the installation process, or null if not applicable.
 */
async function installClaudeCodeExtension() {
  // Check if the environment supports direct extension installation
  if (jR) {
    // Get the current process interaction entries (e.g., VSCode executable path)
    const processInteractionEntries = getEditorCliBinaryOrTerminalName();
    if (processInteractionEntries) {
      // Download the VSIX package and get a cleanup callback and the path to the VSIX file
      const [cleanupVsix, vsixPath] = await extractAndWriteEmbeddedVendorFile("claude-code.vsix");
      // Prepare a promise for any post-installation actions
      const postInstallPromise = JO6();
      try {
        // Attempt to install the extension using the VSCode CLI
        const installResult = await JV(
          processInteractionEntries,
          ["--force", "--install-extension", vsixPath],
          { env: Oc1() }
        );
        // Perform any required cleanup after installation
        CO6(processInteractionEntries);
        // If installation failed, throw an error with details
        if (installResult.code !== 0) {
          throw new Error(`${installResult.code}: ${installResult.error} ${installResult.stderr}`);
        }
        // Wait for any post-installation tasks to complete and return the result
        return await postInstallPromise;
      } finally {
        // Always clean up the downloaded VSIX file
        cleanupVsix();
      }
    }
  } else if (
    kZ &&
    pA.terminal &&
    rQ() !== "wsl"
  ) {
    // If in a JetBrains environment with a terminal and not in WSL, install the JetBrains plugin
    return await installJetBrainsPlugin(
      pA.terminal,
      ro(cr0, "vendor", "claude-code-jetbrains-plugin")
    );
  }
  // If none of the conditions are met, return null
  return null;
}

module.exports = installClaudeCodeExtension;