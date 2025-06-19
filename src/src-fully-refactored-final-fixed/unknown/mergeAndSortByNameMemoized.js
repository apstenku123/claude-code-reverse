/**
 * Merges two arrays and sorts the result by the 'name' property if the second array is not empty.
 * Uses memoization to optimize performance and avoid unnecessary recalculations.
 *
 * @param {Array<Object>} primaryList - The primary array of objects to be merged.
 * @param {Array<Object>} secondaryList - The secondary array of objects to merge with the primary list.
 * @returns {Array<Object>} The merged and sorted array if secondaryList is not empty; otherwise, returns primaryList.
 */
function mergeAndSortByNameMemoized(primaryList, secondaryList) {
  return RS2.useMemo(() => {
    // If secondaryList has items, merge both lists and sort by 'name' property
    if (secondaryList.length > 0) {
      return nT([...primaryList, ...secondaryList], "name");
    }
    // Otherwise, return the primaryList as is
    return primaryList;
  }, [primaryList, secondaryList]);
}

module.exports = mergeAndSortByNameMemoized;