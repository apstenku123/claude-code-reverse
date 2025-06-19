/**
 * Converts a given array-like or iterable object to a Uint32Array.
 * Uses Uint32Array.from if available, otherwise falls back to a manual copy for compatibility.
 *
 * @param {ArrayLike<number>} sourceArray - The array-like or iterable object to convert.
 * @returns {Uint32Array} a new Uint32Array containing the elements from the source array.
 */
function convertArrayToUint32Array(sourceArray) {
  // Check if Uint32Array.from is available (for compatibility with older environments)
  if (!Uint32Array.from) {
    // Manually create a new Uint32Array and copy each element
    const uint32Array = new Uint32Array(sourceArray.length);
    let index = 0;
    while (index < sourceArray.length) {
      uint32Array[index] = sourceArray[index];
      index += 1;
    }
    return uint32Array;
  }
  // Use the built-in from method for modern environments
  return Uint32Array.from(sourceArray);
}

module.exports = convertArrayToUint32Array;
