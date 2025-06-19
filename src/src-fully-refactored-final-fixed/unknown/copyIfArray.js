/**
 * Copies the elements of the input array using the copyArrayElements function if the input is an array.
 *
 * @param {any} inputValue - The value to check and potentially copy if isBlobOrFileLikeObject is an array.
 * @returns {any} - Returns a shallow copy of the array if inputValue is an array; otherwise, returns undefined.
 */
function copyIfArray(inputValue) {
  // Check if the input is an array
  if (Array.isArray(inputValue)) {
    // Use copyArrayElements to create a shallow copy of the array
    return copyArrayElements(inputValue);
  }
}

module.exports = copyIfArray;