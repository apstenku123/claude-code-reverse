/**
 * Filters and sorts a list of command objects based on a search query.
 *
 * If the query is empty (after slicing the first character and trimming),
 * isBlobOrFileLikeObject returns all visible commands, grouped and sorted by their user-facing names
 * according to specific prefixes (PAA, SAA), and then mapped through formatCommandMetadata.
 *
 * If the query is non-empty, isBlobOrFileLikeObject performs a fuzzy search (using VC) over the commands
 * and their aliases, returning unique matches mapped through formatCommandMetadata.
 *
 * @param {string} query - The search query string. Expected to be a path-like string.
 * @param {Array<Object>} commands - The list of command objects to filter and sort. Each command should have:
 *   - isHidden: boolean
 *   - userFacingName(): string
 *   - aliases?: Array<string>
 * @returns {Array<any>} The filtered and sorted list of commands, each mapped through formatCommandMetadata.
 */
function filterAndSortCommandsByQuery(query, commands) {
  // Return empty array if query is not an absolute path or is invalid
  if (!isAbsolutePath(query)) return [];
  if (isQueryInvalid(query)) return [];

  // Remove the first character and convert to lowercase for searching
  const searchTerm = query.slice(1).toLowerCase();

  // If the search term is empty, return all visible commands grouped and sorted
  if (searchTerm.trim() === "") {
    // Filter out hidden commands
    const visibleCommands = commands.filter(command => !command.isHidden);
    const prefixGroupPAA = [];
    const prefixGroupSAA = [];
    const otherCommands = [];

    // Group commands by their user-facing name prefixes
    visibleCommands.forEach(command => {
      const name = command.userFacingName();
      if (name.startsWith(PAA)) {
        prefixGroupPAA.push(command);
      } else if (name.startsWith(SAA)) {
        prefixGroupSAA.push(command);
      } else {
        otherCommands.push(command);
      }
    });

    // Sort each group alphabetically by user-facing name
    const sortByUserFacingName = (a, b) => a.userFacingName().localeCompare(b.userFacingName());
    prefixGroupPAA.sort(sortByUserFacingName);
    prefixGroupSAA.sort(sortByUserFacingName);
    otherCommands.sort(sortByUserFacingName);

    // Concatenate the groups and map through formatCommandMetadata
    return [...prefixGroupPAA, ...prefixGroupSAA, ...otherCommands].map(formatCommandMetadata);
  }

  // If the search term is not empty, perform fuzzy search
  // Build a list of searchable entries for each command (name, split parts, aliases)
  const searchableEntries = commands
    .filter(command => !command.isHidden)
    .flatMap(command => {
      const userFacingName = command.userFacingName();
      const searchKeys = new Set();
      searchKeys.add(userFacingName.toLowerCase());
      // Add split parts (by Vw5) as additional search keys
      userFacingName.split(Vw5).filter(Boolean).forEach(part => searchKeys.add(part.toLowerCase()));
      // Add aliases if present
      if (command.aliases) {
        command.aliases.forEach(alias => searchKeys.add(alias.toLowerCase()));
      }
      // Return an array of search entry objects for this command
      return Array.from(searchKeys).map(searchKey => ({
        searchKey,
        commandName: userFacingName,
        command
      }));
    });

  // Perform fuzzy search using VC (assumed to be a fuzzy search library)
  const fuzzySearchResults = new VC(searchableEntries, {
    includeScore: true,
    threshold: 0.3,
    location: 0,
    distance: 10,
    keys: ["searchKey"]
  }).search(searchTerm);

  // Collect unique commands by their user-facing name
  const uniqueCommandsByName = new Map();
  fuzzySearchResults.forEach(result => {
    const { commandName, command } = result.item;
    if (!uniqueCommandsByName.has(commandName)) {
      uniqueCommandsByName.set(commandName, command);
    }
  });

  // Return the unique commands mapped through formatCommandMetadata
  return Array.from(uniqueCommandsByName.values()).map(formatCommandMetadata);
}

module.exports = filterAndSortCommandsByQuery;