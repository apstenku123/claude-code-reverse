/**
 * Converts an array of alternating keys and values into an object.
 * If the input is not an array, returns the input as-is.
 *
 * @param {any} input - The value to process. If an array, isBlobOrFileLikeObject should contain alternating keys and values (e.g., [key1, value1, key2, value2, ...]).
 * @returns {any} If input is an array, returns an object mapping keys to values. Otherwise, returns the input unchanged.
 */
function arrayToObjectIfArray(input) {
  // Check if the input is an array
  if (Array.isArray(input)) {
    const objectFromArray = {};
    // Iterate over the array in steps of 2 (key-value pairs)
    for (let index = 0; index < input.length; index += 2) {
      const key = input[index];
      const value = input[index + 1];
      objectFromArray[key] = value;
    }
    return objectFromArray;
  }
  // If input is not an array, return isBlobOrFileLikeObject unchanged
  return input;
}

module.exports = arrayToObjectIfArray;
