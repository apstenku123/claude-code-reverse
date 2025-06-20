/**
 * Prepares a command object for execution in a Windows shell environment.
 * If the current platform requires a shell, or if the command does not match certain patterns,
 * this function wraps the command and its arguments to be executed via cmd.exe.
 *
 * @param {Object} commandConfig - The command configuration object.
 * @param {string} commandConfig.command - The command to execute.
 * @param {Array<string>} commandConfig.args - The arguments for the command.
 * @param {Object} [commandConfig.options] - Additional options for command execution.
 * @param {boolean} [commandConfig.options.forceShell] - Whether to force shell execution.
 * @returns {Object} The potentially modified command configuration, ready for execution.
 */
function prepareWindowsShellCommand(commandConfig) {
  // If VT6 is falsy, no shell wrapping is needed; return as is
  if (!VT6) return commandConfig;

  // Normalize and extract the command string
  const normalizedCommand = processFileCommandFromArgs(commandConfig);

  // Determine if the command does NOT match the allowed pattern
  const needsShellWrapping = !KT6.test(normalizedCommand);

  // If forced shell or command needs wrapping, prepare for cmd.exe
  if (commandConfig.options.forceShell || needsShellWrapping) {
    // Check if the command matches the HT6 pattern (e.g., is a shell built-in)
    const isShellBuiltin = HT6.test(normalizedCommand);

    // Normalize the command and arguments for Windows shell
    commandConfig.command = XT6.normalize(commandConfig.command);
    commandConfig.command = no0.command(commandConfig.command);
    commandConfig.args = commandConfig.args.map(arg => no0.argument(arg, isShellBuiltin));

    // Build the full command string
    const fullCommandLine = [commandConfig.command].concat(commandConfig.args).join(" ");

    // Set up arguments for cmd.exe with proper quoting
    commandConfig.args = ["/d", "/createInteractionAccessor", "/c", `"${fullCommandLine}"`];
    commandConfig.command = process.env.comspec || "cmd.exe";
    commandConfig.options.windowsVerbatimArguments = true;
  }

  return commandConfig;
}

module.exports = prepareWindowsShellCommand;