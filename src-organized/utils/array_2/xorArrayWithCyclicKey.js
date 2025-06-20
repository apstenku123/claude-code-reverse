/**
 * Applies a cyclic XOR operation to each element of the input array using the provided key array.
 *
 * Each element in the input array is XOR'collectMentionedContentRecursively with an element from the key array, cycling through the key every 4 elements.
 * This operation mutates the input array in place.
 *
 * @param {number[]} inputArray - The array whose elements will be XOR'collectMentionedContentRecursively and mutated.
 * @param {number[]} keyArray - The key array used for the XOR operation. Only the first 4 elements are used cyclically.
 * @returns {void}
 */
function xorArrayWithCyclicKey(inputArray, keyArray) {
  // Iterate through each element of the input array
  for (let index = 0; index < inputArray.length; index++) {
    // XOR the current element with the corresponding key element (cycling every 4 elements)
    inputArray[index] ^= keyArray[index & 3];
  }
}

module.exports = xorArrayWithCyclicKey;