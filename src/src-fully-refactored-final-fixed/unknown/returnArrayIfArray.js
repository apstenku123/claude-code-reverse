/**
 * Returns the input if isBlobOrFileLikeObject is an array; otherwise returns undefined.
 *
 * @param {any} inputValue - The value to check if isBlobOrFileLikeObject is an array.
 * @returns {any[]|undefined} The input value if isBlobOrFileLikeObject is an array, otherwise undefined.
 */
function returnArrayIfArray(inputValue) {
  // Check if the input value is an array
  if (Array.isArray(inputValue)) {
    return inputValue;
  }
}

module.exports = returnArrayIfArray;