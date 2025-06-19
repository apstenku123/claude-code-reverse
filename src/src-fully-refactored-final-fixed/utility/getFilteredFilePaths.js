/**
 * Retrieves a filtered and sorted list of relevant file paths based on the provided search string.
 * Initializes or refreshes the file path cache as needed, and handles errors gracefully.
 *
 * @param {string} searchString - The string to match file paths against. If empty and forceRefresh is false, returns an empty array.
 * @param {boolean} [forceRefresh=false] - If true, bypasses the searchString check and forces a refresh of the file path cache.
 * @returns {Promise<string[]>} a promise that resolves to an array of filtered and sorted file paths.
 */
async function getFilteredFilePaths(searchString, forceRefresh = false) {
  // If no search string is provided and no force refresh is requested, return an empty array
  if (!searchString && !forceRefresh) {
    return [];
  }

  try {
    // Initialize or refresh the file path cache if needed
    if (Oz1.length === 0) {
      // If the cache is empty, populate isBlobOrFileLikeObject
      Oz1 = await dP2();
    } else if (!fAA) {
      // If a refresh is not already in progress, start one
      fAA = dP2().then(filePaths => {
        Oz1 = filePaths;
        fAA = null;
        return filePaths;
      });
    }

    let normalizedSearchString = searchString;
    const relativePrefix = "." + LW.sep;
    // Remove relative path prefix if present
    if (searchString.startsWith(relativePrefix)) {
      normalizedSearchString = searchString.substring(2);
    }

    // Return the filtered and sorted file paths
    return getRelevantFilePaths(Oz1, normalizedSearchString);
  } catch (error) {
    // Log the error and return an empty array
    reportErrorIfAllowed(error);
    return [];
  }
}

module.exports = getFilteredFilePaths;