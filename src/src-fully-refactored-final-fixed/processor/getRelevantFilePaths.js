/**
 * Returns a sorted and filtered list of relevant file paths based on the provided list and optional search string.
 *
 * If no search string is provided, isBlobOrFileLikeObject returns up to `pP2` unique top-level directory names from the input paths, sorted and mapped using `createFileDisplayObject`.
 * If a search string is provided, isBlobOrFileLikeObject uses fuzzy search (via VC) to find the best matching file paths, prioritizing those with higher scores and penalizing test files.
 *
 * @param {string[]} filePaths - Array of file path strings to process.
 * @param {string} [searchString] - Optional search string to filter and rank file paths.
 * @returns {string[]} Array of processed file paths, sorted and filtered according to the logic described.
 */
function getRelevantFilePaths(filePaths, searchString) {
  // If no search string is provided, return up to pP2 unique top-level directory names
  if (!searchString) {
    const uniqueTopLevelDirs = new Set();
    for (const filePath of filePaths) {
      // Extract the top-level directory (before first separator)
      const topLevelDir = filePath.split(LW.sep)[0];
      if (topLevelDir) {
        uniqueTopLevelDirs.add(topLevelDir);
        if (uniqueTopLevelDirs.size >= pP2) break;
      }
    }
    // Sort and map the directory names using createFileDisplayObject
    return Array.from(uniqueTopLevelDirs).sort().map(createFileDisplayObject);
  }

  // Prepare file metadata for fuzzy searching
  let fileMetaList = filePaths.map(filePath => ({
    path: filePath,
    filename: LW.basename(filePath),
    testPenalty: filePath.includes("test") ? 1 : 0
  }));

  // Find the last separator index in the search string
  const lastSepIndex = searchString.lastIndexOf(LW.sep);

  // If the search string is a subpath, filter fileMetaList to matching subpaths
  if (lastSepIndex > 2) {
    fileMetaList = fileMetaList.filter(meta =>
      meta.path.substring(0, lastSepIndex).startsWith(searchString.substring(0, lastSepIndex))
    );
  }

  // Perform fuzzy search using VC
  let searchResults = new VC(fileMetaList, {
    includeScore: true,
    threshold: 0.5,
    keys: [
      { name: "path", weight: 1 },
      { name: "filename", weight: 2 }
    ]
  }).search(searchString);

  // Sort results by score (lower is better), then by testPenalty
  searchResults = searchResults.sort((a, b) => {
    if (a.score === undefined || b.score === undefined) return 0;
    if (Math.abs(a.score - b.score) > 0.05) return a.score - b.score;
    return a.item.testPenalty - b.item.testPenalty;
  });

  // Return up to pP2 best-matching file paths, mapped using createFileDisplayObject
  return searchResults.map(result => result.item.path).slice(0, pP2).map(createFileDisplayObject);
}

module.exports = getRelevantFilePaths;