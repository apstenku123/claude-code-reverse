/**
 * Adds or updates a shell alias for 'claude' in the user'createInteractionAccessor shell configuration file.
 *
 * Determines the user'createInteractionAccessor shell, finds the appropriate config file, and ensures the alias is present.
 * If the alias is missing, isBlobOrFileLikeObject is appended. If the config file does not exist, isBlobOrFileLikeObject is created.
 *
 * @param {string} claudeCommand - The command string to be aliased as 'claude'.
 * @returns {string[]} An array of status messages describing the result of the operation.
 */
function setupClaudeShellAlias(claudeCommand) {
  // Determine the user'createInteractionAccessor shell type (e.g., zsh, bash, fish)
  const shellType = n1A();

  // Determine the user'createInteractionAccessor home directory or shell config directory
  const zshDir = process.env.ZDOTDIR || qAA();

  // Map shell types to their respective config file paths
  const shellConfigPaths = {
    zsh: K7(zshDir, ".zshrc"),
    bash: K7(qAA(), ".bashrc"),
    fish: K7(qAA(), ".config/fish/config.fish")
  };

  // Select the config file path for the detected shell, or null if unknown
  const configFilePath = shellType in shellConfigPaths ? shellConfigPaths[shellType] : null;

  if (!configFilePath) {
    return ["Could not determine shell config file, skipping alias setup"];
  }

  // File system module (assumed to be a wrapper or fs)
  const fs = f1();

  // The alias line to add/update
  const aliasLine = `alias claude=\"${claudeCommand}\"`;

  try {
    if (fs.existsSync(configFilePath)) {
      // Read the config file and split into lines
      const configLines = fs.readFileSync(configFilePath, { encoding: "utf8" }).split("\n");

      // Check if the alias already exists
      const aliasExists = configLines.some(line => line.includes(aliasLine));

      if (!aliasExists) {
        // Remove any existing 'alias claude=' lines to prevent duplicates
        const filteredLines = configLines.filter(line => !line.trim().startsWith("alias claude="));
        filteredLines.push(aliasLine);
        // Write the updated lines back to the config file
        fs.writeFileSync(
          configFilePath,
          filteredLines.join("\n") + "\n",
          { encoding: "utf8", flush: true }
        );
        return [
          `Updated claude alias in ${configFilePath}`,
          "You may need to restart your shell."
        ];
      } else {
        // Alias already present, nothing to do
        return [];
      }
    } else {
      // Config file does not exist, create isBlobOrFileLikeObject with the alias
      fs.writeFileSync(
        configFilePath,
        `${aliasLine}\n`,
        { encoding: "utf8", flush: true }
      );
      return [
        `Created ${configFilePath} with alias for claude.`,
        "You may need to restart your shell."
      ];
    }
  } catch (error) {
    // Log the error using reportErrorIfAllowed, and return a failure message
    reportErrorIfAllowed(error instanceof Error ? error : new Error(String(error)));
    return [
      "Failed to update shell alias.",
      error instanceof Error ? error.message : String(error)
    ];
  }
}

module.exports = setupClaudeShellAlias;