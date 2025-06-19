/**
 * Converts an array-like or iterable object to a Uint32Array.
 * If Uint32Array.from is not available (older environments),
 * manually copies the values into a new Uint32Array.
 *
 * @param {ArrayLike<number>} sourceArray - The array-like or iterable object containing numeric values to convert.
 * @returns {Uint32Array} a new Uint32Array containing the values from the source array.
 */
function convertToUint32Array(sourceArray) {
  // Check if Uint32Array.from is available (modern environments)
  if (typeof Uint32Array.from !== 'function') {
    // Fallback for environments without Uint32Array.from
    const resultArray = new Uint32Array(sourceArray.length);
    for (let index = 0; index < sourceArray.length; index += 1) {
      resultArray[index] = sourceArray[index];
    }
    return resultArray;
  }
  // Use the native Uint32Array.from method if available
  return Uint32Array.from(sourceArray);
}

module.exports = convertToUint32Array;
