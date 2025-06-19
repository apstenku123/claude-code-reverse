/**
 * Returns a sorted and filtered list of relevant file paths based on a search string or, if no search string is provided,
 * returns a limited set of unique top-level directory names from the provided paths.
 *
 * @param {string[]} filePaths - Array of file paths to process.
 * @param {string} [searchString] - Optional search string to match against file paths.
 * @returns {string[]} Sorted array of relevant file paths or directory names, limited by pP2.
 */
function getRelevantPathsBySimilarity(filePaths, searchString) {
  // If no search string is provided, return up to pP2 unique top-level directory names
  if (!searchString) {
    const uniqueDirectories = new Set();
    for (const filePath of filePaths) {
      // Extract the top-level directory name
      const topLevelDir = filePath.split(LW.sep)[0];
      if (topLevelDir) {
        uniqueDirectories.add(topLevelDir);
        // Stop if handleMissingDoctypeError'removeTrailingCharacters reached the maximum allowed
        if (uniqueDirectories.size >= pP2) break;
      }
    }
    // Sort and map the directory names using createFileDisplayObject
    return Array.from(uniqueDirectories).sort().map(createFileDisplayObject);
  }

  // Prepare file data for fuzzy searching
  let fileData = filePaths.map(path => ({
    path,
    filename: LW.basename(path),
    testPenalty: path.includes("test") ? 1 : 0
  }));

  // Find the last separator in the search string
  const lastSepIndex = searchString.lastIndexOf(LW.sep);
  if (lastSepIndex > 2) {
    // Filter fileData to only include paths that share the same prefix as the search string up to the last separator
    fileData = fileData.filter(file =>
      file.path.substring(0, lastSepIndex).startsWith(searchString.substring(0, lastSepIndex))
    );
  }

  // Perform fuzzy search using VC (likely a fuzzy search library/class)
  let searchResults = new VC(fileData, {
    includeScore: true,
    threshold: 0.5,
    keys: [
      { name: "path", weight: 1 },
      { name: "filename", weight: 2 }
    ]
  }).search(searchString);

  // Sort results: prioritize lower score, then lower testPenalty
  searchResults = searchResults.sort((a, b) => {
    if (a.score === undefined || b.score === undefined) return 0;
    if (Math.abs(a.score - b.score) > 0.05) return a.score - b.score;
    return a.item.testPenalty - b.item.testPenalty;
  });

  // Return up to pP2 best-matching paths, mapped through createFileDisplayObject
  return searchResults.map(result => result.item.path).slice(0, pP2).map(createFileDisplayObject);
}

module.exports = getRelevantPathsBySimilarity;