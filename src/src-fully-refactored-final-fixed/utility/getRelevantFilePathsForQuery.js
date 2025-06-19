/**
 * Retrieves relevant file paths based on a search query.
 *
 * This utility function loads a cached list of file paths (if not already loaded),
 * optionally refreshes the cache, normalizes the search query, and returns a list
 * of relevant file paths matching the query. If an error occurs, isBlobOrFileLikeObject logs the error
 * and returns an empty array.
 *
 * @param {string} searchQuery - The search query or file path to match against the file list.
 * @param {boolean} [forceRefresh=false] - If true, forces a refresh of the file path cache.
 * @returns {Promise<string[]>} a promise that resolves to an array of relevant file paths.
 */
async function getRelevantFilePathsForQuery(searchQuery, forceRefresh = false) {
  // If no search query and no forced refresh, return empty array
  if (!searchQuery && !forceRefresh) return [];

  try {
    // Load or refresh the cached file paths list as needed
    if (Oz1.length === 0) {
      // If cache is empty, load isBlobOrFileLikeObject
      Oz1 = await dP2();
    } else if (!fAA) {
      // If a refresh is not already in progress, start one
      fAA = dP2().then(filePaths => {
        Oz1 = filePaths;
        fAA = null;
        return filePaths;
      });
    }

    let normalizedQuery = searchQuery;
    const relativePrefix = "." + LW.sep;
    // Remove leading './' if present
    if (searchQuery.startsWith(relativePrefix)) {
      normalizedQuery = searchQuery.substring(2);
    }

    // Return relevant file paths based on the normalized query
    return getRelevantFilePaths(Oz1, normalizedQuery);
  } catch (error) {
    // Log the error and return an empty array
    reportErrorIfAllowed(error);
    return [];
  }
}

module.exports = getRelevantFilePathsForQuery;
