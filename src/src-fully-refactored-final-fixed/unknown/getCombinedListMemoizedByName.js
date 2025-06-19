/**
 * Returns a memoized array that combines two input arrays and sorts them by the 'name' property, if both arrays are provided and the second array is non-empty.
 * If the second array is empty or not provided, returns the first array or an empty array.
 *
 * @param {Array} primaryList - The main array of items to use as the base list.
 * @param {Array} additionalList - An optional array of items to merge with the primary list.
 * @returns {Array} a memoized array: either the combined and sorted list by 'name', or the primary list, or an empty array.
 */
function getCombinedListMemoizedByName(primaryList, additionalList) {
  return $S2.useMemo(() => {
    // If both lists exist and the additional list has items, merge and sort them by 'name'
    if (primaryList && additionalList && additionalList.length > 0) {
      return nT([...primaryList, ...additionalList], "name");
    }
    // Otherwise, return the primary list or an empty array
    return primaryList || [];
  }, [primaryList, additionalList]);
}

module.exports = getCombinedListMemoizedByName;