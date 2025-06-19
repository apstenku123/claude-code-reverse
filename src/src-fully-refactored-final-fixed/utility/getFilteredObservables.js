/**
 * Retrieves and filters a list of observables based on the provided source name.
 * If the observable list is not loaded, isBlobOrFileLikeObject loads isBlobOrFileLikeObject asynchronously. Handles relative paths.
 *
 * @param {string} sourceName - The name of the observable to filter for. Can be a relative path.
 * @param {boolean} [forceLoad=false] - If true, forces loading even if sourceName is falsy.
 * @returns {Promise<Array>} a promise that resolves to an array of filtered observables.
 */
async function getFilteredObservables(sourceName, forceLoad = false) {
  // If no sourceName and not forced to load, return empty array
  if (!sourceName && !forceLoad) return [];
  try {
    // Load the observable list if not already loaded
    if (Oz1.length === 0) {
      Oz1 = await dP2();
    } else if (!fAA) {
      // If a loading promise is not already in progress, start one
      fAA = dP2().then(loadedObservables => {
        Oz1 = loadedObservables;
        fAA = null;
        return loadedObservables;
      });
    }

    let observableName = sourceName;
    const relativePrefix = "." + LW.sep;
    // Remove relative path prefix if present
    if (sourceName.startsWith(relativePrefix)) {
      observableName = sourceName.substring(2);
    }
    // Filter the loaded observables using getRelevantFilePaths
    return getRelevantFilePaths(Oz1, observableName);
  } catch (error) {
    // Log the error and return an empty array
    reportErrorIfAllowed(error);
    return [];
  }
}

module.exports = getFilteredObservables;