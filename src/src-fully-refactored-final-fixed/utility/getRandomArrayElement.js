/**
 * Returns a random element from the provided array.
 *
 * @param {Array} array - The array from which to select a random element.
 * @returns {*} The randomly selected element from the array, or undefined if the array is empty.
 */
function getRandomArrayElement(array) {
  const arrayLength = array.length;
  // If the array is not empty, select a random index and return the element at that index
  return arrayLength ? array[j4A(0, arrayLength - 1)] : undefined;
}

module.exports = getRandomArrayElement;