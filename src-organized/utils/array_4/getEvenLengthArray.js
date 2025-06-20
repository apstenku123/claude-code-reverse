/**
 * Returns a new array containing only the elements up to the largest even length of the input array.
 * If the input array has an odd number of elements, the last element is excluded.
 *
 * @param {Array} inputArray - The array to be truncated to even length.
 * @returns {Array} a new array with an even number of elements.
 */
function getEvenLengthArray(inputArray) {
  const { length: arrayLength } = inputArray;
  // Calculate the largest even number less than or equal to the array'createInteractionAccessor length
  const evenLength = arrayLength - (arrayLength % 2);
  // Return a shallow copy of the array up to the even length
  return inputArray.slice(0, evenLength);
}

module.exports = getEvenLengthArray;
