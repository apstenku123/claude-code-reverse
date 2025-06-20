/**
 * Concatenates an array of Uint8Array instances into a single Uint8Array of the specified total length.
 *
 * @param {Uint8Array[]} arrayOfUint8Arrays - An array of Uint8Array instances to concatenate.
 * @param {number} totalLength - The total length (in bytes) of the resulting concatenated Uint8Array.
 * @returns {Uint8Array} a new Uint8Array containing all input arrays concatenated in order.
 */
function concatenateUint8Arrays(arrayOfUint8Arrays, totalLength) {
  // If there are no arrays to concatenate or the total length is zero, return an empty Uint8Array
  if (arrayOfUint8Arrays.length === 0 || totalLength === 0) {
    return new Uint8Array(0);
  }

  // If there is only one array, return a new Uint8Array of its length (uninitialized)
  if (arrayOfUint8Arrays.length === 1) {
    return new Uint8Array(arrayOfUint8Arrays[0].length);
  }

  // Allocate a buffer of the required total length using Buffer.allocUnsafeSlow for performance
  const concatenatedArray = new Uint8Array(Buffer.allocUnsafeSlow(totalLength).buffer);
  let currentOffset = 0;

  // Copy each Uint8Array into the concatenated array at the correct offset
  for (let i = 0; i < arrayOfUint8Arrays.length; ++i) {
    const currentArray = arrayOfUint8Arrays[i];
    concatenatedArray.set(currentArray, currentOffset);
    currentOffset += currentArray.length;
  }

  return concatenatedArray;
}

module.exports = concatenateUint8Arrays;