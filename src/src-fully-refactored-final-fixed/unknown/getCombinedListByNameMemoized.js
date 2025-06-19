/**
 * Returns a memoized array, combining the baseList and additionalList by 'name' if additionalList is non-empty.
 * Uses $S2.useMemo for memoization and nT for combining and sorting by 'name'.
 *
 * @param {Array} baseList - The primary array of items.
 * @param {Array} additionalList - An optional array of additional items to combine with baseList.
 * @returns {Array} The memoized combined array sorted by 'name', or baseList if additionalList is empty or not provided.
 */
function getCombinedListByNameMemoized(baseList, additionalList) {
  return $S2.useMemo(() => {
    // If both lists exist and additionalList has items, combine and sort by 'name'
    if (baseList && additionalList && additionalList.length > 0) {
      return nT([...baseList, ...additionalList], "name");
    }
    // Otherwise, return baseList or an empty array if baseList is falsy
    return baseList || [];
  }, [baseList, additionalList]);
}

module.exports = getCombinedListByNameMemoized;