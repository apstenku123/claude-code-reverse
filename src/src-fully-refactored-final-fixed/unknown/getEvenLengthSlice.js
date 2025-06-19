/**
 * Returns a slice of the input array containing only the elements up to the largest even length.
 * If the array has an odd number of elements, the last element is excluded.
 *
 * @param {Array} inputArray - The array to be sliced to an even length.
 * @returns {Array} a new array containing only the elements up to the largest even length.
 */
function getEvenLengthSlice(inputArray) {
  const { length: arrayLength } = inputArray;
  // Calculate the largest even number less than or equal to the array'createInteractionAccessor length
  const evenLength = arrayLength - (arrayLength % 2);
  // Return a slice of the array up to the even length
  return inputArray.slice(0, evenLength);
}

module.exports = getEvenLengthSlice;
