/**
 * Counts the number of times a specific value appears in an array.
 *
 * @param {Array} array - The array to search through.
 * @param {*} valueToCount - The value to count occurrences of.
 * @returns {number} The number of times valueToCount appears in array.
 */
function countOccurrences(array, valueToCount) {
  let occurrenceCount = 0;
  let currentIndex = array.length;

  // Iterate backwards through the array
  while (currentIndex--) {
    if (array[currentIndex] === valueToCount) {
      occurrenceCount++;
    }
  }

  return occurrenceCount;
}

module.exports = countOccurrences;