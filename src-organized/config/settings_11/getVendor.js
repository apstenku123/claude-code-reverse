/**
 * Retrieves and installs the vendor extension or plugin depending on the environment.
 *
 * If running in a supported environment (jR), attempts to install the VSCode extension 'claude-code.vsix'.
 * If not, but running in a JetBrains terminal environment, attempts to install the JetBrains plugin.
 * Returns the package version string if successful, or null otherwise.
 *
 * @async
 * @returns {Promise<string|null>} The current version string of the Claude Code package if installed, or null if not applicable.
 */
async function getVendorExtension() {
  // Check if the environment supports VSCode extension installation
  if (jR) {
    // Get the current VSCode process or environment (implementation of getEditorCliBinaryOrTerminalName not shown)
    const vscodeProcess = getEditorCliBinaryOrTerminalName();
    if (vscodeProcess) {
      // Download and prepare the VSIX extension for installation
      // extractAndWriteEmbeddedVendorFile returns [cleanupCallback, extensionPath]
      const [cleanupExtension, extensionPath] = await extractAndWriteEmbeddedVendorFile("claude-code.vsix");
      // Retrieve the current Claude Code package version
      const getPackageVersion = JO6();
      try {
        // Install the extension using the VSCode process
        const installResult = await JV(
          vscodeProcess,
          ["--force", "--install-extension", extensionPath],
          { env: Oc1() } // Use Linux environment with DISPLAY unset if needed
        );
        // Perform any required cleanup after installation
        CO6(vscodeProcess);
        // If installation failed, throw an error with details
        if (installResult.code !== 0) {
          throw new Error(`${installResult.code}: ${installResult.error} ${installResult.stderr}`);
        }
        // Return the package version string
        return await getPackageVersion;
      } finally {
        // Always clean up the downloaded extension file
        cleanupExtension();
      }
    }
  } else if (
    // Check if running in a JetBrains terminal environment and not in WSL
    kZ &&
    pA.terminal &&
    rQ() !== "wsl"
  ) {
    // Install the JetBrains plugin and return the result
    return await installJetBrainsPlugin(
      pA.terminal,
      ro(cr0, "vendor", "claude-code-jetbrains-plugin")
    );
  }
  // If neither environment is supported, return null
  return null;
}

module.exports = getVendorExtension;