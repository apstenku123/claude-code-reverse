/**
 * Filters and sorts a list of command objects based on a query string.
 * If the query is empty, commands are grouped and sorted by their user-facing name prefix.
 * Otherwise, performs a fuzzy search on command names and aliases.
 *
 * @param {string} query - The search query or command input string.
 * @param {Array<Object>} commands - The list of command objects to filter and sort.
 * @returns {Array<any>} An array of processed command objects after filtering and sorting.
 */
function filterAndSortCommands(query, commands) {
  // Return empty array if query is not an absolute path or is invalid
  if (!isAbsolutePath(query)) return [];
  if (isQueryInvalid(query)) return [];

  // Remove the first character and convert to lowercase for searching
  const searchTerm = query.slice(1).toLowerCase();

  // If the search term is empty, group and sort commands by prefix
  if (searchTerm.trim() === "") {
    // Filter out hidden commands
    const visibleCommands = commands.filter(cmd => !cmd.isHidden);
    const paaCommands = [];
    const saaCommands = [];
    const otherCommands = [];

    // Group commands by their user-facing name prefix
    visibleCommands.forEach(cmd => {
      const userFacingName = cmd.userFacingName();
      if (userFacingName.startsWith(PAA)) {
        paaCommands.push(cmd);
      } else if (userFacingName.startsWith(SAA)) {
        saaCommands.push(cmd);
      } else {
        otherCommands.push(cmd);
      }
    });

    // Sort each group alphabetically by user-facing name
    const sortByUserFacingName = (a, b) => a.userFacingName().localeCompare(b.userFacingName());
    paaCommands.sort(sortByUserFacingName);
    saaCommands.sort(sortByUserFacingName);
    otherCommands.sort(sortByUserFacingName);

    // Combine all groups and map to processed command objects
    return [...paaCommands, ...saaCommands, ...otherCommands].map(processCommand);
  }

  // For non-empty search term, build a searchable index of commands and their aliases
  const searchIndex = commands
    .filter(cmd => !cmd.isHidden)
    .flatMap(cmd => {
      const userFacingName = cmd.userFacingName();
      const searchKeys = new Set();
      // Add the full user-facing name
      searchKeys.add(userFacingName.toLowerCase());
      // Add split parts of the name (by Vw5 delimiter)
      userFacingName.split(Vw5).filter(Boolean).forEach(part => searchKeys.add(part.toLowerCase()));
      // Add aliases if present
      if (cmd.aliases) {
        cmd.aliases.forEach(alias => searchKeys.add(alias.toLowerCase()));
      }
      // Return an array of search key objects for this command
      return Array.from(searchKeys).map(key => ({
        searchKey: key,
        commandName: userFacingName,
        command: cmd
      }));
    });

  // Perform fuzzy search using VC library
  const searchResults = new VC(searchIndex, {
    includeScore: true,
    threshold: 0.3,
    location: 0,
    distance: 10,
    keys: ["searchKey"]
  }).search(searchTerm);

  // Collect unique commands by their user-facing name
  const uniqueCommands = new Map();
  searchResults.forEach(result => {
    const { commandName, command } = result.item;
    if (!uniqueCommands.has(commandName)) {
      uniqueCommands.set(commandName, command);
    }
  });

  // Map the unique commands to processed command objects
  return Array.from(uniqueCommands.entries()).map(([_, command]) => processCommand(command));
}

module.exports = filterAndSortCommands;