/**
 * Determines if a command string is a prefix pattern (ending with ':*') or an exact command.
 *
 * If the command ends with ':*', returns an object indicating a 'prefix' type and the extracted prefix.
 * Otherwise, returns an object indicating an 'exact' type and the original command.
 *
 * @param {string} commandPattern - The command string to analyze (may end with ':*' to indicate a prefix pattern).
 * @returns {{ type: 'prefix', prefix: string } | { type: 'exact', command: string }}
 *   An object describing the type of command and its associated value.
 */
function getCommandTypeFromPattern(commandPattern) {
  // Attempt to extract the prefix if the pattern ends with ':*'
  const prefix = extractPrefixBeforeWildcard(commandPattern);

  if (prefix !== null) {
    // The command is a prefix pattern
    return {
      type: "prefix",
      prefix: prefix
    };
  } else {
    // The command is an exact match
    return {
      type: "exact",
      command: commandPattern
    };
  }
}

module.exports = getCommandTypeFromPattern;