/**
 * Processes the 'file' property of the given command context object. If the file corresponds to a known command,
 * updates the command context accordingly and re-processes the file argument. Otherwise, returns the file as is.
 *
 * @param {Object} commandContext - The context object for the command-line interaction. Must have 'args' (array),
 *   and may have 'file' and 'command' properties.
 * @returns {any} The result of re-processing the file argument if a command is found, otherwise the file itself.
 */
function processFileArgumentAndCommand(commandContext) {
  // Extract the file argument from the command context using io0
  commandContext.file = io0(commandContext);

  // Determine if the file argument corresponds to a known command using CT6
  const detectedCommand = commandContext.file && CT6(commandContext.file);

  if (detectedCommand) {
    // If a command is detected, unshift the file back into the args array
    commandContext.args.unshift(commandContext.file);
    // Update the command property with the detected command
    commandContext.command = detectedCommand;
    // Re-process the file argument with the updated context
    return io0(commandContext);
  }

  // If no command is detected, return the file as is
  return commandContext.file;
}

module.exports = processFileArgumentAndCommand;