/**
 * Filters and returns command configurations that match a given command string and subscription type.
 *
 * @param {Object} sourceObservable - The source object containing the command to match (expects a 'command' property).
 * @param {Map} commandConfigMap - a Map of command configuration entries. Each key is a command identifier, each value is a config object.
 * @param {string} subscriptionType - The type of subscription match to perform ('exact' or 'prefix').
 * @returns {Array} An array of command configuration objects that match the given command and subscription type.
 */
function filterCommandsByType(sourceObservable, commandConfigMap, subscriptionType) {
  // Trim the command string from the source observable for comparison
  const trimmedCommand = sourceObservable.command.trim();

  // Iterate over all command configuration entries and filter those that match
  const matchingConfigs = Array.from(commandConfigMap.entries()).filter(([commandKey, configValue]) => {
    // Parse the command key into a structured object (getCommandType is assumed to be an external parser)
    const parsedCommand = getCommandType(commandKey);

    switch (parsedCommand.type) {
      case "exact":
        // For 'exact' type, match the full command string
        return parsedCommand.command === trimmedCommand;
      case "prefix":
        // For 'prefix' type, match based on the subscription type
        switch (subscriptionType) {
          case "exact":
            // Only match if the prefix exactly equals the command
            return parsedCommand.prefix === trimmedCommand;
          case "prefix":
            // Match if the command starts with the prefix
            return trimmedCommand.startsWith(parsedCommand.prefix);
          default:
            // If subscriptionType is not recognized, do not match
            return false;
        }
      default:
        // If command type is not recognized, do not match
        return false;
    }
  })
  // Extract only the configuration objects from the filtered entries
  .map(([, configValue]) => configValue);

  return matchingConfigs;
}

module.exports = filterCommandsByType;