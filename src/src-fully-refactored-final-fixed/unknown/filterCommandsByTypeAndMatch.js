/**
 * Filters and returns command configurations that match a given command string and match type.
 *
 * @param {Object} sourceObservable - The source object containing the command to match (expects a 'command' property).
 * @param {Map} commandConfigMap - a Map of command configuration entries. Each key is a command identifier, each value is a config object.
 * @param {string} matchType - The type of match to perform: 'exact' or 'prefix'.
 * @returns {Array<Object>} An array of command configuration objects that match the criteria.
 */
function filterCommandsByTypeAndMatch(sourceObservable, commandConfigMap, matchType) {
  // Trim the command string from the source observable
  const trimmedCommand = sourceObservable.command.trim();

  // Iterate over all command config entries and filter those that match the criteria
  const matchingConfigs = Array.from(commandConfigMap.entries())
    .filter(([commandKey, configValue]) => {
      // Parse the command key into a structured object
      const parsedCommand = getCommandType(commandKey);
      switch (parsedCommand.type) {
        case "exact":
          // For exact type, command must match exactly
          return parsedCommand.command === trimmedCommand;
        case "prefix":
          // For prefix type, behavior depends on the matchType parameter
          switch (matchType) {
            case "exact":
              // Only match if the prefix matches exactly
              return parsedCommand.prefix === trimmedCommand;
            case "prefix":
              // Match if the command starts with the prefix
              return trimmedCommand.startsWith(parsedCommand.prefix);
            default:
              // If matchType is unknown, do not match
              return false;
          }
        default:
          // If type is unknown, do not match
          return false;
      }
    })
    // Extract only the config values from the filtered entries
    .map(([, configValue]) => configValue);

  return matchingConfigs;
}

module.exports = filterCommandsByTypeAndMatch;