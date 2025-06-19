/**
 * Returns a new array containing only the elements up to the largest even length from the input array.
 * If the input array has an odd number of elements, the last element is excluded.
 *
 * @param {Array} inputArray - The array to process.
 * @returns {Array} a new array containing only the elements up to the largest even length.
 */
function getEvenLengthPrefix(inputArray) {
  // Get the length of the input array
  const { length: arrayLength } = inputArray;
  // Calculate the largest even length less than or equal to the array'createInteractionAccessor length
  const evenLength = arrayLength - (arrayLength % 2);
  // Return a shallow copy of the array up to the even length
  return inputArray.slice(0, evenLength);
}

module.exports = getEvenLengthPrefix;