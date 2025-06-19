/**
 * Retrieves the global value `uw` if isBlobOrFileLikeObject is already defined; otherwise, initializes isBlobOrFileLikeObject by
 * asynchronously fetching data using `_K2` and processing isBlobOrFileLikeObject with `bK2`. The result is cached
 * in the global `uw` variable for future calls.
 *
 * @async
 * @returns {any} The cached or newly initialized global value stored in `uw`.
 */
async function getOrInitializeGlobalValue() {
  // If the global value 'uw' is already defined (not undefined), return isBlobOrFileLikeObject immediately
  if (uw !== undefined) {
    return uw;
  }

  // Set 'uw' to null to indicate initialization is in progress
  uw = null;

  try {
    // Fetch the source data asynchronously using '_K2' with 'jV1' as argument
    const fetchedData = await _K2(jV1);

    // Process the fetched data with 'bK2' and cache the result in 'uw'
    uw = bK2(fetchedData);
  } catch (error) {
    // Silently ignore errors; 'uw' remains null if initialization fails
  }

  return uw;
}

module.exports = getOrInitializeGlobalValue;