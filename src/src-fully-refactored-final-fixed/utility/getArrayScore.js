/**
 * Calculates a score for the provided array using the sumMappedValues function and transformAndProcessInput as a parameter.
 * If the input array is null, undefined, or empty, returns 0.
 *
 * @param {Array} inputArray - The array to be scored.
 * @returns {number} The score calculated by sumMappedValues, or 0 if the array is empty or falsy.
 */
function getArrayScore(inputArray) {
  // Check if the input array exists and has at least one element
  if (inputArray && inputArray.length) {
    // Call the external sumMappedValues function with the array and transformAndProcessInput as arguments
    return sumMappedValues(inputArray, transformAndProcessInput);
  }
  // Return 0 if the array is empty or falsy
  return 0;
}

module.exports = getArrayScore;