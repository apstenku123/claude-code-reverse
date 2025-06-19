/**
 * Concatenates an array of Uint8Array instances into a single Uint8Array.
 *
 * @param {Uint8Array[]} arrayOfUint8Arrays - An array containing Uint8Array instances to concatenate.
 * @returns {Uint8Array} a new Uint8Array containing all the bytes from the input arrays, in order.
 */
function concatenateUint8Arrays(arrayOfUint8Arrays) {
  // Calculate the total length required for the concatenated array
  let totalLength = 0;
  for (const uint8Array of arrayOfUint8Arrays) {
    totalLength += uint8Array.length;
  }

  // Create a new Uint8Array with the total length
  const concatenatedArray = new Uint8Array(totalLength);

  // Copy each Uint8Array into the concatenated array at the correct offset
  let offset = 0;
  for (const uint8Array of arrayOfUint8Arrays) {
    concatenatedArray.set(uint8Array, offset);
    offset += uint8Array.length;
  }

  return concatenatedArray;
}

module.exports = concatenateUint8Arrays;