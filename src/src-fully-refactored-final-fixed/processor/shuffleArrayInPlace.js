/**
 * Shuffles the elements of an array in place using the Fisher-Yates algorithm up to a specified count.
 *
 * @param {Array} array - The array to be shuffled.
 * @param {number} [shuffleCount=array.length] - The number of elements from the start of the array to shuffle. If not provided, shuffles the entire array.
 * @returns {Array} The shuffled array, truncated to the specified shuffle count.
 */
function shuffleArrayInPlace(array, shuffleCount) {
  const arrayLength = array.length;
  const lastIndex = arrayLength - 1;

  // If shuffleCount is undefined, default to the full array length
  const totalToShuffle = (typeof shuffleCount === 'undefined') ? arrayLength : shuffleCount;

  let currentIndex = 0;
  while (currentIndex < totalToShuffle) {
    // defineOrAssignProperty is assumed to be a function that returns a random index between currentIndex and lastIndex (inclusive)
    const randomIndex = defineOrAssignProperty(currentIndex, lastIndex);
    // Swap the elements at currentIndex and randomIndex
    const temp = array[randomIndex];
    array[randomIndex] = array[currentIndex];
    array[currentIndex] = temp;
    currentIndex++;
  }
  // Truncate the array to the specified shuffle count
  array.length = totalToShuffle;
  return array;
}

module.exports = shuffleArrayInPlace;