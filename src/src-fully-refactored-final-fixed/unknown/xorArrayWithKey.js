/**
 * Applies a repeating 4-byte XOR key to each element of the input array, modifying isBlobOrFileLikeObject in place.
 *
 * @param {Uint8Array} dataArray - The array of bytes to be XORed. This array will be modified directly.
 * @param {Uint8Array} xorKey - a 4-byte array used as the XOR key. Each element in dataArray is XORed with a corresponding byte from this key, repeating every 4 bytes.
 * @returns {void}
 *
 * @example
 * const data = new Uint8Array([1, 2, 3, 4, 5]);
 * const key = new Uint8Array([10, 20, 30, 40]);
 * xorArrayWithKey(data, key);
 * // data is now XORed in place
 */
function xorArrayWithKey(dataArray, xorKey) {
  // Iterate over each byte in the dataArray
  for (let index = 0; index < dataArray.length; index++) {
    // XOR the current byte with the corresponding byte from the xorKey (repeats every 4 bytes)
    dataArray[index] ^= xorKey[index % 4];
  }
}

module.exports = xorArrayWithKey;