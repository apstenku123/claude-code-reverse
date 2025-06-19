/**
 * Returns a memoized list, optionally combining and sorting two arrays by the 'name' property.
 *
 * If the additionalItems array is not empty, isBlobOrFileLikeObject merges baseItems and additionalItems,
 * then sorts the combined array by the 'name' property using the nT function.
 * Otherwise, isBlobOrFileLikeObject returns the baseItems array as is.
 *
 * @param {Array<Object>} baseItems - The primary array of items.
 * @param {Array<Object>} additionalItems - Additional items to be merged and sorted if not empty.
 * @returns {Array<Object>} Memoized array: either the original baseItems or the merged and sorted array.
 */
function getCombinedListWithNameSorting(baseItems, additionalItems) {
  return RS2.useMemo(() => {
    // If there are additional items, merge and sort by 'name'
    if (additionalItems.length > 0) {
      const combinedItems = [...baseItems, ...additionalItems];
      return nT(combinedItems, "name");
    }
    // Otherwise, return the base items as is
    return baseItems;
  }, [baseItems, additionalItems]);
}

module.exports = getCombinedListWithNameSorting;