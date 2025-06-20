/**
 * Checks if two arrays are shallowly equal using a custom comparator function.
 *
 * @param {Array<any>} firstArray - The first array to compare.
 * @param {Array<any>} secondArray - The second array to compare.
 * @returns {boolean} True if both arrays are shallowly equal according to the comparator, false otherwise.
 */
function areArraysShallowEqualWithComparator(firstArray, secondArray) {
  // If the second array is null, arrays are not equal
  if (secondArray === null) return false;

  // Iterate over both arrays up to the length of the shorter one
  for (
    let index = 0;
    index < secondArray.length && index < firstArray.length;
    index++
  ) {
    // Use the LB comparator function to check equality of elements at the current index
    if (!LB(firstArray[index], secondArray[index])) {
      return false;
    }
  }
  // All compared elements are equal
  return true;
}

module.exports = areArraysShallowEqualWithComparator;