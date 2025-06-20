/**
 * Copies the provided array using the copyArraySegment function if the input is an array.
 *
 * @param {any} sourceValue - The value to check and potentially copy if isBlobOrFileLikeObject is an array.
 * @returns {any} - Returns a shallow copy of the array if input is an array, otherwise undefined.
 */
function copyArrayIfArray(sourceValue) {
  // Check if the input is an array
  if (Array.isArray(sourceValue)) {
    // Use copyArraySegment (aliased from copyArraySegment) to create a shallow copy of the array
    return copyArraySegment(sourceValue);
  }
}

module.exports = copyArrayIfArray;