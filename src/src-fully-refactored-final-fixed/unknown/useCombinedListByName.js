/**
 * useCombinedListByName
 *
 * Combines two arrays (primaryList and additionalList) and sorts them by the 'name' property if both are provided and additionalList is non-empty.
 * Uses a memoization hook to optimize performance and avoid unnecessary recalculations.
 *
 * @param {Array} primaryList - The main array of items to be used as the base list.
 * @param {Array} additionalList - An optional array of items to be merged with the primary list.
 * @returns {Array} The combined and sorted array by 'name', or the primary list if additionalList is empty or not provided.
 */
function useCombinedListByName(primaryList, additionalList) {
  return $S2.useMemo(() => {
    // If both lists exist and additionalList has items, merge and sort by 'name'
    if (primaryList && additionalList && additionalList.length > 0) {
      return nT([...primaryList, ...additionalList], "name");
    }
    // Otherwise, return the primary list or an empty array
    return primaryList || [];
  }, [primaryList, additionalList]);
}

module.exports = useCombinedListByName;