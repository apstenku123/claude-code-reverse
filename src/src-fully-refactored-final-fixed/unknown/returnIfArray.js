/**
 * Returns the input value if isBlobOrFileLikeObject is an array; otherwise, returns undefined.
 *
 * @param {any} value - The value to check if isBlobOrFileLikeObject is an array.
 * @returns {any[]|undefined} The same array if the input is an array, otherwise undefined.
 */
function returnIfArray(value) {
  // Check if the input is an array
  if (Array.isArray(value)) {
    return value;
  }
}

module.exports = returnIfArray;