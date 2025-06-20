/**
 * Checks if two arrays are deeply equal by comparing each corresponding element using the LB comparator function.
 *
 * @param {Array<any>} firstArray - The first array to compare.
 * @param {Array<any>} secondArray - The second array to compare.
 * @returns {boolean} Returns true if both arrays are deeply equal (up to the length of the shorter array), otherwise false.
 */
function areArraysDeepEqual(firstArray, secondArray) {
  // If the second array is null, arrays are not equal
  if (secondArray === null) return false;

  // Iterate over both arrays up to the length of the shorter one
  for (
    let index = 0;
    index < secondArray.length && index < firstArray.length;
    index++
  ) {
    // Use the LB comparator function to check if elements are equal
    if (!LB(firstArray[index], secondArray[index])) {
      return false;
    }
  }

  // All compared elements are equal
  return true;
}

module.exports = areArraysDeepEqual;