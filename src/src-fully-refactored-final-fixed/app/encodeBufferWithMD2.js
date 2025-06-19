/**
 * Encodes the input data using the MD2 algorithm for each byte.
 *
 * @param {string|Buffer} inputData - The data to be encoded. Can be a string or Buffer.
 * @returns {string} The concatenated MD2-encoded string for each byte of the input.
 *
 * This function creates a Buffer from the input data, iterates over each byte,
 * applies the MD2 hashing function to each byte, and concatenates the results into a single string.
 */
function encodeBufferWithMD2(inputData) {
  // Create a Buffer from the input data
  const buffer = Buffer.from(inputData);
  let encodedResult = "";

  // Iterate over each byte in the buffer
  for (let byteIndex = 0; byteIndex < buffer.length; ++byteIndex) {
    // Apply MD2 to each byte and concatenate the result
    encodedResult += MD2(buffer[byteIndex]);
  }

  return encodedResult;
}

module.exports = encodeBufferWithMD2;