/**
 * Returns the result of applying the sumMappedValues function to the provided array and the transformAndProcessInput callback if the array is non-empty.
 * If the array is empty or falsy, returns 0.
 *
 * @param {Array} inputArray - The array to check and process.
 * @returns {number} The result of sumMappedValues(inputArray, transformAndProcessInput) if inputArray is non-empty, otherwise 0.
 */
function getArrayLengthOrDefault(inputArray) {
  // Check if inputArray exists and has a length greater than 0
  if (inputArray && inputArray.length) {
    // Process the array with sumMappedValues and transformAndProcessInput if non-empty
    return sumMappedValues(inputArray, transformAndProcessInput);
  } else {
    // Return 0 for empty or falsy arrays
    return 0;
  }
}

module.exports = getArrayLengthOrDefault;