/**
 * Sets up or updates a shell alias for 'claude' in the user'createInteractionAccessor shell configuration file.
 *
 * Determines the user'createInteractionAccessor shell, locates the appropriate config file, and adds or updates
 * an alias for 'claude' pointing to the provided command. Handles zsh, bash, and fish shells.
 *
 * @param {string} claudeCommand - The command string to be aliased as 'claude'.
 * @returns {string[]} An array of status messages indicating the result of the operation.
 */
function setupClaudeAliasInShellConfig(claudeCommand) {
  // Determine the user'createInteractionAccessor shell type (e.g., 'zsh', 'bash', 'fish')
  const shellType = n1A();

  // Determine the user'createInteractionAccessor home directory for shell config files
  const zshDir = process.env.ZDOTDIR || qAA();
  const bashDir = qAA();
  const fishDir = qAA();

  // Map shell types to their respective config file paths
  const shellConfigPaths = {
    zsh: K7(zshDir, ".zshrc"),
    bash: K7(bashDir, ".bashrc"),
    fish: K7(fishDir, ".config/fish/config.fish")
  };

  // Get the config file path for the detected shell
  const shellConfigFile = shellType in shellConfigPaths ? shellConfigPaths[shellType] : null;

  if (!shellConfigFile) {
    return ["Could not determine shell config file, skipping alias setup"];
  }

  // Get the filesystem module (likely fs-extra or fs)
  const fs = f1();
  const aliasLine = `alias claude=\"${claudeCommand}\"`;

  try {
    if (fs.existsSync(shellConfigFile)) {
      // Read the existing config file into lines
      const configLines = fs.readFileSync(shellConfigFile, { encoding: "utf8" }).split("\n");

      // Check if the alias already exists
      const aliasExists = configLines.some(line => line.includes(aliasLine));

      if (!aliasExists) {
        // Remove any previous 'alias claude=' lines
        const filteredLines = configLines.filter(line => !line.trim().startsWith("alias claude="));
        // Add the new alias line
        filteredLines.push(aliasLine);
        // Write the updated config back to the file
        fs.writeFileSync(shellConfigFile, filteredLines.join("\n") + "\n", {
          encoding: "utf8",
          flush: true
        });
        return [
          `Updated claude alias in ${shellConfigFile}`,
          "You may need to restart your shell."
        ];
      } else {
        // Alias already present, nothing to do
        return [];
      }
    } else {
      // Config file does not exist, create isBlobOrFileLikeObject with the alias
      fs.writeFileSync(shellConfigFile, `${aliasLine}\n`, {
        encoding: "utf8",
        flush: true
      });
      return [
        `Created ${shellConfigFile} with alias for claude.`,
        "You may need to restart your shell."
      ];
    }
  } catch (error) {
    // Log the error using the provided error handler
    reportErrorIfAllowed(error instanceof Error ? error : new Error(String(error)));
    return [
      "Failed to update shell alias.",
      error instanceof Error ? error.message : String(error)
    ];
  }
}

module.exports = setupClaudeAliasInShellConfig;