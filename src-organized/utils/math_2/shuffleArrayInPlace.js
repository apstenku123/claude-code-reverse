/**
 * Shuffles the elements of an array in place using the Fisher-Yates algorithm up to a specified count, then truncates the array to that count.
 *
 * @param {Array} array The array to shuffle.
 * @param {number} [count] Optional. The number of elements to shuffle and keep. If not provided, the entire array is shuffled.
 * @returns {Array} The shuffled array, truncated to the specified count if provided.
 */
function shuffleArrayInPlace(array, count) {
  let currentIndex = -1;
  const arrayLength = array.length;
  const lastIndex = arrayLength - 1;
  // If count is not provided, shuffle the entire array
  count = count === undefined ? arrayLength : count;
  while (++currentIndex < count) {
    // Pick a random index between currentIndex and lastIndex (inclusive)
    const randomIndex = getRandomInt(currentIndex, lastIndex);
    // Swap the elements at currentIndex and randomIndex
    const temp = array[randomIndex];
    array[randomIndex] = array[currentIndex];
    array[currentIndex] = temp;
  }
  // Truncate the array to the specified count
  array.length = count;
  return array;
}

/**
 * Returns a random integer between min and max (inclusive).
 * @param {number} min The minimum integer.
 * @param {number} max The maximum integer.
 * @returns {number} a random integer between min and max.
 */
function getRandomInt(min, max) {
  // Math.floor(Math.random() * (max - min + 1)) + min
  return min + Math.floor(Math.random() * (max - min + 1));
}

module.exports = shuffleArrayInPlace;