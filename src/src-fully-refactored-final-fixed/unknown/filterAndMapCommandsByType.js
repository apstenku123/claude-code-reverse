/**
 * Filters and maps command configurations based on the provided command and subscription type.
 *
 * @param {Object} sourceCommand - The source command object containing a 'command' property (string).
 * @param {Map} commandConfigMap - a Map of command configuration entries, where each key is a command identifier and each value is a command configuration object.
 * @param {string} subscriptionType - The type of subscription to match ('exact' or 'prefix').
 * @returns {Array} An array of command configuration objects that match the provided command and subscription type.
 */
function filterAndMapCommandsByType(sourceCommand, commandConfigMap, subscriptionType) {
  // Trim the input command string for accurate matching
  const trimmedCommand = sourceCommand.command.trim();

  // Filter command configurations based on their type and the subscription type
  const matchingConfigs = Array.from(commandConfigMap.entries()).filter(([commandKey, commandConfig]) => {
    // Parse the command key to get its type and associated data
    const parsedCommand = getCommandType(commandKey);

    switch (parsedCommand.type) {
      case "exact":
        // For exact type, match if the command exactly equals the trimmed input
        return parsedCommand.command === trimmedCommand;
      case "prefix":
        switch (subscriptionType) {
          case "exact":
            // For prefix type with 'exact' subscription, match if the prefix exactly equals the trimmed input
            return parsedCommand.prefix === trimmedCommand;
          case "prefix":
            // For prefix type with 'prefix' subscription, match if the trimmed input starts with the prefix
            return trimmedCommand.startsWith(parsedCommand.prefix);
        }
        break;
      default:
        // If the type is unrecognized, do not include isBlobOrFileLikeObject
        return false;
    }
  })
  // Map the filtered entries to their configuration objects
  .map(([, commandConfig]) => commandConfig);

  return matchingConfigs;
}

module.exports = filterAndMapCommandsByType;