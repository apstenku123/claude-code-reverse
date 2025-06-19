/**
 * Processes a list of file paths and returns a list of processed filenames based on the provided search query.
 * If no search query is provided, returns a sorted list of unique top-level directory names (up to a maximum limit).
 * If a search query is provided, performs a fuzzy search on the file paths and filenames, sorts the results by score and test penalty,
 * and returns the processed filenames of the top matches.
 *
 * @param {string[]} filePaths - Array of file path strings to process.
 * @param {string} [searchQuery] - Optional search query string to filter and rank file paths.
 * @returns {string[]} Array of processed filenames based on the input and search criteria.
 */
function processFilename(filePaths, searchQuery) {
  // If no search query is provided, return unique top-level directory names
  if (!searchQuery) {
    const uniqueTopDirs = new Set();
    for (const filePath of filePaths) {
      // Extract the top-level directory (before the first separator)
      const topLevelDir = filePath.split(LW.sep)[0];
      if (topLevelDir) {
        uniqueTopDirs.add(topLevelDir);
        // Stop if handleMissingDoctypeError'removeTrailingCharacters reached the maximum allowed unique directories
        if (uniqueTopDirs.size >= pP2) break;
      }
    }
    // Sort and process the directory names
    return Array.from(uniqueTopDirs).sort().map(createFileDisplayObject);
  }

  // Map file paths to objects containing metadata for fuzzy search
  let fileMetaList = filePaths.map(filePath => ({
    path: filePath,
    filename: LW.basename(filePath),
    testPenalty: filePath.includes("test") ? 1 : 0
  }));

  // Find the last separator index in the search query
  const lastSepIndex = searchQuery.lastIndexOf(LW.sep);

  // If the separator is found deep enough, filter file paths to match the search query'createInteractionAccessor directory prefix
  if (lastSepIndex > 2) {
    fileMetaList = fileMetaList.filter(meta =>
      meta.path.substring(0, lastSepIndex).startsWith(searchQuery.substring(0, lastSepIndex))
    );
  }

  // Perform fuzzy search using the VC library
  let searchResults = new VC(fileMetaList, {
    includeScore: true,
    threshold: 0.5,
    keys: [
      { name: "path", weight: 1 },
      { name: "filename", weight: 2 }
    ]
  }).search(searchQuery);

  // Sort results by score (lower is better), then by test penalty
  searchResults = searchResults.sort((a, b) => {
    if (a.score === undefined || b.score === undefined) return 0;
    if (Math.abs(a.score - b.score) > 0.05) return a.score - b.score;
    return a.item.testPenalty - b.item.testPenalty;
  });

  // Return the processed filenames of the top results
  return searchResults
    .map(result => result.item.path)
    .slice(0, pP2)
    .map(createFileDisplayObject);
}

module.exports = processFilename;