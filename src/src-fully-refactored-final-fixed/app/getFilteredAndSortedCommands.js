/**
 * Filters and sorts a list of command objects based on a search query or path input.
 * If the input is not an absolute path or is a special case, returns an empty array.
 * If the search query is empty, sorts commands into three categories based on their user-facing names.
 * Otherwise, performs a fuzzy search on command names and aliases, returning matching commands.
 *
 * @param {string} inputPathOrQuery - The input string, typically a path or search query.
 * @param {Array<Object>} commands - The list of command objects to filter and sort.
 * @returns {Array<any>} An array of processed command objects, mapped by formatCommandMetadata.
 */
function getFilteredAndSortedCommands(inputPathOrQuery, commands) {
  // Check if the input is an absolute path; if not, return empty array
  if (!isAbsolutePath(inputPathOrQuery)) return [];
  // Check for special case (e.g., input is a directory or reserved path); if so, return empty array
  if (isSpecialPath(inputPathOrQuery)) return [];

  // Remove the first character (likely '/') and convert to lowercase for search
  const searchQuery = inputPathOrQuery.slice(1).toLowerCase();

  // If the search query is empty, sort commands into three categories
  if (searchQuery.trim() === "") {
    // Only include commands that are not hidden
    const visibleCommands = commands.filter(command => !command.isHidden);
    const startsWithPAA = [];
    const startsWithSAA = [];
    const otherCommands = [];

    // Categorize commands based on their user-facing names
    visibleCommands.forEach(command => {
      const userFacingName = command.userFacingName();
      if (userFacingName.startsWith(PAA)) {
        startsWithPAA.push(command);
      } else if (userFacingName.startsWith(SAA)) {
        startsWithSAA.push(command);
      } else {
        otherCommands.push(command);
      }
    });

    // Sort each category alphabetically by user-facing name
    const sortByUserFacingName = (a, b) => a.userFacingName().localeCompare(b.userFacingName());
    startsWithPAA.sort(sortByUserFacingName);
    startsWithSAA.sort(sortByUserFacingName);
    otherCommands.sort(sortByUserFacingName);

    // Concatenate all categories and map each command through formatCommandMetadata
    return [...startsWithPAA, ...startsWithSAA, ...otherCommands].map(formatCommandMetadata);
  }

  // For non-empty search queries, build a searchable index of commands and their aliases
  const searchableEntries = commands
    .filter(command => !command.isHidden)
    .flatMap(command => {
      const userFacingName = command.userFacingName();
      const searchKeys = new Set();
      // Add the full user-facing name (lowercase)
      searchKeys.add(userFacingName.toLowerCase());
      // Add each word in the user-facing name (split by Vw5), lowercased
      userFacingName.split(Vw5).filter(Boolean).forEach(word => searchKeys.add(word.toLowerCase()));
      // Add all aliases (if any), lowercased
      if (command.aliases) {
        command.aliases.forEach(alias => searchKeys.add(alias.toLowerCase()));
      }
      // Return an array of searchable entries for this command
      return Array.from(searchKeys).map(searchKey => ({
        searchKey,
        commandName: command.userFacingName(),
        command
      }));
    });

  // Use fuzzy search (VC) to find matching commands
  const fuzzySearchResults = new VC(searchableEntries, {
    includeScore: true,
    threshold: 0.3,
    location: 0,
    distance: 10,
    keys: ["searchKey"]
  }).search(searchQuery);

  // Use a map to ensure unique commands by their user-facing name
  const uniqueCommandsMap = new Map();
  fuzzySearchResults.forEach(result => {
    const { commandName, command } = result.item;
    if (!uniqueCommandsMap.has(commandName)) {
      uniqueCommandsMap.set(commandName, command);
    }
  });

  // Return the unique commands, mapped through formatCommandMetadata
  return Array.from(uniqueCommandsMap.values()).map(formatCommandMetadata);
}

module.exports = getFilteredAndSortedCommands;