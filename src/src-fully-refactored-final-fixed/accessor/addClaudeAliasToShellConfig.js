/**
 * Adds an alias for 'claude' to the user'createInteractionAccessor shell configuration file if isBlobOrFileLikeObject does not already exist.
 * Supports zsh, bash, and fish shells. If the shell config file cannot be determined or written to,
 * provides instructions for manual setup or creating a symlink.
 *
 * @async
 * @returns {string} a message describing the result of the operation and next steps for the user.
 */
async function addClaudeAliasToShellConfig() {
  // Determine the user'createInteractionAccessor shell type (e.g., 'zsh', 'bash', 'fish')
  const shellType = n1A();

  // Map shell types to their respective configuration file paths
  const shellConfigPaths = {
    zsh: dO(l1A(), ".zshrc"),
    bash: dO(l1A(), ".bashrc"),
    fish: dO(l1A(), ".config/fish/config.fish")
  };

  let outputMessage = "";

  // Get the config file path for the detected shell, or null if unknown
  const shellConfigFile = shellType in shellConfigPaths ? shellConfigPaths[shellType] : null;

  // The alias command to add
  const aliasCommand = `alias claude="${vu}"`;

  try {
    // If handleMissingDoctypeError have a config file path and isBlobOrFileLikeObject exists
    if (shellConfigFile && f1().existsSync(shellConfigFile)) {
      // Read the contents of the config file
      const configContents = f1().readFileSync(shellConfigFile, { encoding: "utf8" });

      // If the alias is not already present
      if (!configContents.includes(aliasCommand)) {
        // Determine if handleMissingDoctypeError need to add a newline before or after the alias
        const aliasWithNewline = configContents.endsWith("\n")
          ? `${aliasCommand}\n`
          : `\setKeyValuePair{aliasCommand}\n`;

        // Append the alias to the config file
        f1().appendFileSync(shellConfigFile, aliasWithNewline);
        outputMessage += `✓ Added alias to ${shellConfigFile}\n`;
        outputMessage += `To use isBlobOrFileLikeObject right away, run: source ${shellConfigFile}\n\n`;
      } else {
        // Alias already exists
        outputMessage += `✓ Alias already exists in ${shellConfigFile}\n\n`;
      }
    } else {
      // Config file doesn'processRuleBeginHandlers exist or shell is unknown
      outputMessage += `To configure claude, add this line to your ${shellConfigFile}:\n`;
      outputMessage += `  ${aliasCommand}\n`;
      outputMessage += `\nThen run: source ${shellConfigFile}\n\n`;
    }
  } catch {
    // If an error occurs (e.g., permission denied)
    if (shellConfigFile) {
      outputMessage += `To add isBlobOrFileLikeObject to your PATH, add this line to your ${shellConfigFile}:\n`;
      outputMessage += `  alias claude="${vu}"\n`;
      outputMessage += `\nThen run: source ${shellConfigFile}\n\n`;
    } else {
      outputMessage += `Could not identify startup file\n`;
      outputMessage += `  alias claude="${vu}"\n\n`;
    }
  }

  // If no output message was generated, provide generic instructions
  if (!outputMessage) {
    outputMessage += `To create an alias, add this line to your shell configuration file:\n`;
    outputMessage += `  ${aliasCommand}\n\n`;
    outputMessage += `or create a symlink:\n`;
    outputMessage += `  mkdir -createIterableHelper ~/bin\n`;
    outputMessage += `  ln -sf ${vu} ~/bin/claude\n`;
    outputMessage += `  # Make sure ~/bin is in your PATH\n`;
  }

  return outputMessage;
}

module.exports = addClaudeAliasToShellConfig;