/**
 * Sorts an array using a custom comparator function.
 *
 * @param {Array<any>} arrayToSort - The array to be sorted.
 * @param {any} comparatorConfig - Configuration or options passed to the comparator function.
 * @returns {Array<any>} The sorted array.
 */
function sortArrayWithCustomComparator(arrayToSort, comparatorConfig) {
  // Sort the array in-place using a custom comparator
  // The comparator function cM6 is assumed to be defined elsewhere
  // It is called with (itemB, itemA, comparatorConfig) for each comparison
  return arrayToSort.sort((itemA, itemB) => cM6(itemB, itemA, comparatorConfig));
}

module.exports = sortArrayWithCustomComparator;
