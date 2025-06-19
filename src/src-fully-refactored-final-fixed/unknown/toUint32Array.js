/**
 * Converts an array-like or iterable object to a Uint32Array.
 * Falls back to a manual copy if Uint32Array.from is not available (for older environments).
 *
 * @param {ArrayLike<number> | Iterable<number>} sourceArray - The array-like or iterable object to convert.
 * @returns {Uint32Array} a new Uint32Array containing the elements from the source.
 */
function toUint32Array(sourceArray) {
  // Check if Uint32Array.from is available (modern environments)
  if (typeof Uint32Array.from !== 'function') {
    // Manual fallback: create a new Uint32Array and copy elements one by one
    const resultArray = new Uint32Array(sourceArray.length);
    let index = 0;
    while (index < sourceArray.length) {
      resultArray[index] = sourceArray[index];
      index += 1;
    }
    return resultArray;
  }
  // Use the built-in from method for conversion
  return Uint32Array.from(sourceArray);
}

module.exports = toUint32Array;