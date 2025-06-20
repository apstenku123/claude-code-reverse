/**
 * Determines the type of command based on the provided command string.
 * If the command has a recognized prefix (as determined by _o1),
 * returns an object indicating a 'prefix' type and the prefix value.
 * Otherwise, returns an object indicating an 'exact' type and the original command.
 *
 * @param {string} command - The command string to analyze.
 * @returns {{type: 'prefix', prefix: string} | {type: 'exact', command: string}} An object describing the command type and associated data.
 */
function getCommandType(command) {
  // Attempt to extract a known prefix from the command string
  const prefix = _o1(command);

  if (prefix !== null) {
    // If a prefix is found, return type 'prefix' with the prefix value
    return {
      type: "prefix",
      prefix: prefix
    };
  } else {
    // If no prefix is found, return type 'exact' with the original command
    return {
      type: "exact",
      command: command
    };
  }
}

module.exports = getCommandType;