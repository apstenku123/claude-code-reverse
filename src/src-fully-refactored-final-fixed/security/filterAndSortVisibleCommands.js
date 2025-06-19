/**
 * Filters and sorts a list of command objects based on a search query and visibility.
 *
 * @param {string} searchInput - The user input string to search for commands. Should be an absolute path.
 * @param {Array<Object>} commandList - Array of command objects to filter and sort. Each command should have:
 *   - isHidden: boolean
 *   - userFacingName(): string
 *   - aliases?: Array<string>
 * @returns {Array<Object>} Array of processed command objects, mapped through formatCommandMetadata.
 */
function filterAndSortVisibleCommands(searchInput, commandList) {
  // Return empty array if input is not an absolute path or is otherwise invalid
  if (!isAbsolutePath(searchInput)) return [];
  if (isInputInvalid(searchInput)) return [];

  // Remove the leading character (assumed to be '/') and convert to lowercase for searching
  const normalizedQuery = searchInput.slice(1).toLowerCase();

  // If the search query is empty (just "/"), return all visible commands, sorted and grouped
  if (normalizedQuery.trim() === "") {
    // Filter out hidden commands
    const visibleCommands = commandList.filter(command => !command.isHidden);
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

    // Concatenate all groups and map through formatCommandMetadata
    return [...primaryCommands, ...secondaryCommands, ...otherCommands].map(formatCommandMetadata);
  }

  // For non-empty queries, build a search index of all visible commands and their aliases
  const searchIndex = commandList
    .filter(command => !command.isHidden)
    .flatMap(command => {
      const commandName = command.userFacingName();
      const searchKeys = new Set();
      // Add the full command name (lowercased)
      searchKeys.add(commandName.toLowerCase());
      // Add each word in the command name (split by Vw5), lowercased
      commandName.split(COMMAND_NAME_SPLIT_REGEX).filter(Boolean).forEach(word => {
        searchKeys.add(word.toLowerCase());
      });
      // Add each alias, lowercased
      if (command.aliases) {
        command.aliases.forEach(alias => {
          searchKeys.add(alias.toLowerCase());
        });
      }
      // Return an array of search key objects for this command
      return Array.from(searchKeys).map(searchKey => ({
        searchKey,
        commandName,
        command
      }));
    });

  // Use fuzzy search (VC) to find matching commands
  const fuseResults = new VC(searchIndex, {
    includeScore: true,
    threshold: 0.3,
    location: 0,
    distance: 10,
    keys: ["searchKey"]
  }).search(normalizedQuery);

  // Deduplicate commands by their user-facing name
  const uniqueCommandsMap = new Map();
  fuseResults.forEach(result => {
    const { commandName, command } = result.item;
    if (!uniqueCommandsMap.has(commandName)) {
      uniqueCommandsMap.set(commandName, command);
    }
  });

  // Return the unique commands, mapped through formatCommandMetadata
  return Array.from(uniqueCommandsMap.values()).map(formatCommandMetadata);
}

module.exports = filterAndSortVisibleCommands;