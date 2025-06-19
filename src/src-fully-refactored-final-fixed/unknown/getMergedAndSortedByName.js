/**
 * Returns a memoized array that merges two arrays and sorts them by the 'name' property if the second array is not empty.
 * If the second array is empty, returns the first array as is.
 *
 * @param {Array<Object>} primaryArray - The main array of objects to be merged and/or returned.
 * @param {Array<Object>} secondaryArray - The array of objects to merge with the primary array. If empty, no merge occurs.
 * @returns {Array<Object>} The merged and sorted array, or the original primary array if secondaryArray is empty.
 */
function getMergedAndSortedByName(primaryArray, secondaryArray) {
  return RS2.useMemo(() => {
    // If secondaryArray has elements, merge both arrays and sort by 'name' property
    if (secondaryArray.length > 0) {
      return nT([...primaryArray, ...secondaryArray], "name");
    }
    // If secondaryArray is empty, return primaryArray as is
    return primaryArray;
  }, [primaryArray, secondaryArray]);
}

module.exports = getMergedAndSortedByName;