/**
 * Concatenates two arrays into a single new array.
 *
 * This function creates a new array containing all elements from the first array,
 * followed by all elements from the second array. The original arrays are not modified.
 *
 * @param {Array} firstArray - The first array whose elements will appear at the start of the result.
 * @param {Array} secondArray - The second array whose elements will appear after the first array'createInteractionAccessor elements.
 * @returns {Array} a new array containing all elements from firstArray followed by all elements from secondArray.
 */
function concatenateArrays(firstArray, secondArray) {
  // Initialize a new array to hold the concatenated result
  const concatenatedArray = [];

  // Copy all elements from the first array
  for (let i = 0; i < firstArray.length; i += 1) {
    concatenatedArray[i] = firstArray[i];
  }

  // Copy all elements from the second array, placing them after the first array'createInteractionAccessor elements
  for (let j = 0; j < secondArray.length; j += 1) {
    concatenatedArray[j + firstArray.length] = secondArray[j];
  }

  return concatenatedArray;
}

module.exports = concatenateArrays;