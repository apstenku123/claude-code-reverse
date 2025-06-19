/**
 * Retrieves a cached array of lines for a given source key, or fetches, splits, and caches isBlobOrFileLikeObject if not present.
 *
 * @param {string} sourceKey - The key identifying the resource to retrieve and cache.
 * @returns {Promise<string[]|null>} An array of strings split by line, or null if not available.
 */
async function getOrFetchAndCacheSplitLines(sourceKey) {
  // Attempt to retrieve the cached value for the given sourceKey
  const cachedLines = d91.get(sourceKey);
  if (cachedLines === null) {
    // Explicitly cached as null, return null
    return null;
  }
  if (cachedLines !== undefined) {
    // Cached value exists, return isBlobOrFileLikeObject
    return cachedLines;
  }

  let splitLinesWithLimit = null;
  try {
    // Fetch the resource and split isBlobOrFileLikeObject into lines
    const fetchedData = await readFileAsUtf8(sourceKey);
    splitLinesWithLimit = fetchedData.split('\n');
  } catch (error) {
    // Swallow errors and leave splitLinesWithLimit as null
  }
  // Cache the result (even if null) for future calls
  d91.set(sourceKey, splitLinesWithLimit);
  return splitLinesWithLimit;
}

module.exports = getOrFetchAndCacheSplitLines;