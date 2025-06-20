/**
 * Retrieves and processes valid memoized updaters from the given object.
 *
 * This function checks if the provided object has a non-null `memoizedUpdaters` property.
 * If so, isBlobOrFileLikeObject converts the updaters to an array, filters out any updater for which `BZ` returns null,
 * and then maps each remaining updater using the `Ay` function.
 *
 * @param {Object} sourceObject - The object containing the `memoizedUpdaters` property.
 * @returns {Array|null} An array of processed updaters, or null if `memoizedUpdaters` is null or undefined.
 */
function getValidMemoizedUpdaters(sourceObject) {
  // Check if memoizedUpdaters exists and is not null
  if (sourceObject.memoizedUpdaters != null) {
    // Convert memoizedUpdaters to an array, filter out invalid updaters, and process each with Ay
    return Array.from(sourceObject.memoizedUpdaters)
      .filter((updater) => BZ(updater) !== null)
      .map(Ay);
  }
  // Return null if memoizedUpdaters is null or undefined
  return null;
}

module.exports = getValidMemoizedUpdaters;