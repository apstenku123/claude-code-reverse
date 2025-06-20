/**
 * Converts an array-like or iterable object to a Uint32Array.
 * Provides a polyfill for environments where Uint32Array.from is not available.
 *
 * @param {ArrayLike<number> | Iterable<number>} sourceArray - The array-like or iterable object to convert.
 * @returns {Uint32Array} a new Uint32Array containing the values from the source.
 */
function toUint32Array(sourceArray) {
  // Check if Uint32Array.from is available (modern environments)
  if (typeof Uint32Array.from !== 'function') {
    // Polyfill: manually copy elements to a new Uint32Array
    const resultArray = new Uint32Array(sourceArray.length);
    for (let index = 0; index < sourceArray.length; index += 1) {
      resultArray[index] = sourceArray[index];
    }
    return resultArray;
  }
  // Use native Uint32Array.from if available
  return Uint32Array.from(sourceArray);
}

module.exports = toUint32Array;
