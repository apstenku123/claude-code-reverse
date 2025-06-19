/**
 * Finds a command object from a list by matching its user-facing name or any of its aliases.
 * Throws a ReferenceError if no matching command is found, listing all available commands and their aliases.
 *
 * @param {string} commandName - The name or alias of the command to search for.
 * @param {Array<Object>} commandList - The list of command objects to search within. Each command object must have a userFacingName() method and may have an aliases array.
 * @returns {Object} The matched command object.
 * @throws {ReferenceError} If no matching command is found.
 */
function findCommandByNameOrAlias(commandName, commandList) {
  // Attempt to find a command whose user-facing name or aliases match the provided name
  const matchedCommand = commandList.find(command =>
    command.userFacingName() === commandName ||
    (Array.isArray(command.aliases) && command.aliases.includes(commandName))
  );

  if (!matchedCommand) {
    // Build a descriptive error message listing all available commands and their aliases
    const availableCommands = commandList.map(command => {
      const name = command.userFacingName();
      return Array.isArray(command.aliases) && command.aliases.length > 0
        ? `${name} (aliases: ${command.aliases.join(", ")})`
        : name;
    }).join(", ");
    throw new ReferenceError(
      `Command ${commandName} not found. Available commands: ${availableCommands}`
    );
  }

  return matchedCommand;
}

module.exports = findCommandByNameOrAlias;