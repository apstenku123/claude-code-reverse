/**
 * Randomly shuffles the elements of an array using the Fisher-Yates algorithm.
 *
 * @param {any[]} array - The array to be shuffled. The original array is not modified.
 * @returns {any[]} a new array containing the shuffled elements.
 */
function shuffleArray(array) {
  // Create a shallow copy of the input array to avoid mutating the original
  const shuffled = array.slice();

  // Iterate from the end of the array down to the second element
  for (let currentIndex = shuffled.length - 1; currentIndex > 1; currentIndex--) {
    // Pick a random index from 0 to currentIndex (inclusive)
    const randomIndex = Math.floor(Math.random() * (currentIndex + 1));
    // Swap the current element with the element at the random index
    const temp = shuffled[currentIndex];
    shuffled[currentIndex] = shuffled[randomIndex];
    shuffled[randomIndex] = temp;
  }

  return shuffled;
}

module.exports = shuffleArray;