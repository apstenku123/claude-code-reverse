/**
 * Formats command metadata for display and further processing.
 *
 * @param {Object} command - The command object containing metadata and display information.
 * @param {function} command.userFacingName - Returns the user-facing name of the command.
 * @param {string[]} [command.aliases] - Optional array of alias names for the command.
 * @param {string} command.description - Description of the command.
 * @param {string} command.type - The type of the command (e.g., 'prompt').
 * @param {string[]} [command.argNames] - Optional array of argument names if the command is a prompt.
 * @returns {Object} An object containing formatted metadata for the command.
 */
function formatCommandMetadata(command) {
  // Get the main display name for the command
  const commandName = command.userFacingName();

  // If aliases exist and are non-empty, format them for display
  const aliasDisplay = (Array.isArray(command.aliases) && command.aliases.length > 0)
    ? ` (${command.aliases.join(", ")})`
    : "";

  // If the command is a prompt and has argument names, append them to the description
  const argumentDescription = (command.type === "prompt" && Array.isArray(command.argNames) && command.argNames.length > 0)
    ? ` (arguments: ${command.argNames.join(", ")})`
    : "";

  return {
    id: commandName,
    displayText: `/${commandName}${aliasDisplay}`,
    description: command.description + argumentDescription,
    metadata: command
  };
}

module.exports = formatCommandMetadata;