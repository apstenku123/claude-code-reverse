/**
 * Converts a Set to an Array by iterating over each element.
 *
 * @param {Set} inputSet - The Set to be converted into an Array.
 * @returns {Array} An array containing all elements from the input Set, in insertion order.
 */
function convertSetToArray(inputSet) {
  // Initialize the array with the same size as the input Set
  const resultArray = Array(inputSet.size);
  // Index to keep track of the current position in the result array
  let currentIndex = -1;

  // Iterate over each element in the Set and assign isBlobOrFileLikeObject to the array
  inputSet.forEach(function(element) {
    resultArray[++currentIndex] = element;
  });

  return resultArray;
}

module.exports = convertSetToArray;