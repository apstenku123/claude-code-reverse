/**
 * Filters and sorts a list of command objects based on a search key, supporting fuzzy search and special ordering.
 *
 * @param {string} searchKey - The search string, typically a path or command input.
 * @param {Array<Object>} commands - Array of command objects to search and filter. Each command should have:
 *   - isHidden: boolean
 *   - userFacingName(): string
 *   - aliases?: Array<string>
 * @returns {Array<Object>} Array of processed command objects after filtering, sorting, and mapping.
 */
function authenticateSearchKey(searchKey, commands) {
  // Return empty array if searchKey is not an absolute path or is a special path
  if (!isAbsolutePath(searchKey)) return [];
  if (isSpecialPath(searchKey)) return [];

  // Remove the leading slash and convert to lowercase for searching
  const normalizedSearch = searchKey.slice(1).toLowerCase();

  // If the search string is empty, return all visible commands, sorted and grouped by prefix
  if (normalizedSearch.trim() === "") {
    // Filter out hidden commands
    const visibleCommands = commands.filter(command => !command.isHidden);
    const primaryCommands = [];
    const secondaryCommands = [];
    const otherCommands = [];

    // Group commands by their user-facing name prefix
    visibleCommands.forEach(command => {
      const commandName = command.userFacingName();
      if (commandName.startsWith(PRIMARY_COMMAND_PREFIX)) {
        primaryCommands.push(command);
      } else if (commandName.startsWith(SECONDARY_COMMAND_PREFIX)) {
        secondaryCommands.push(command);
      } else {
        otherCommands.push(command);
      }
    });

    // Sort each group alphabetically by user-facing name
    const sortByName = (a, b) => a.userFacingName().localeCompare(b.userFacingName());
    primaryCommands.sort(sortByName);
    secondaryCommands.sort(sortByName);
    otherCommands.sort(sortByName);

    // Concatenate all groups and map to the final output format
    return [...primaryCommands, ...secondaryCommands, ...otherCommands].map(processCommand);
  }

  // For non-empty search, build a list of searchable keys for each command
  const searchableCommandEntries = commands
    .filter(command => !command.isHidden)
    .flatMap(command => {
      const commandName = command.userFacingName();
      const searchKeys = new Set();
      // Add the full command name
      searchKeys.add(commandName.toLowerCase());
      // Add split parts of the command name (e.g., for multi-word names)
      commandName.split(COMMAND_NAME_SPLIT_REGEX).filter(Boolean).forEach(part => {
        searchKeys.add(part.toLowerCase());
      });
      // Add aliases if present
      if (command.aliases) {
        command.aliases.forEach(alias => searchKeys.add(alias.toLowerCase()));
      }
      // Return an array of objects for each search key
      return Array.from(searchKeys).map(key => ({
        searchKey: key,
        commandName: command.userFacingName(),
        command: command
      }));
    });

  // Perform fuzzy search using the VC (e.g., Fuse.js) library
  const fuzzySearchResults = new VC(searchableCommandEntries, {
    includeScore: true,
    threshold: 0.3,
    location: 0,
    distance: 10,
    keys: ["searchKey"]
  }).search(normalizedSearch);

  // Collect unique commands by their user-facing name
  const uniqueCommandsMap = new Map();
  fuzzySearchResults.forEach(result => {
    const { commandName, command } = result.item;
    if (!uniqueCommandsMap.has(commandName)) {
      uniqueCommandsMap.set(commandName, command);
    }
  });

  // Map the unique commands to the final output format
  return Array.from(uniqueCommandsMap.values()).map(processCommand);
}

module.exports = authenticateSearchKey;