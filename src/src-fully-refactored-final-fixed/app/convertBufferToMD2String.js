/**
 * Converts an input value to a Buffer, applies the MD2 function to each byte, and concatenates the results into a string.
 *
 * @param {string|Buffer|Array|ArrayBuffer} inputData - The data to be converted into a Buffer and processed.
 * @returns {string} The concatenated string result of applying MD2 to each byte of the Buffer.
 */
function convertBufferToMD2String(inputData) {
  // Create a Buffer from the input data
  const buffer = new Buffer(inputData);
  let md2ResultString = "";

  // Iterate over each byte in the buffer
  for (let byteIndex = 0; byteIndex < buffer.length; ++byteIndex) {
    // Apply the MD2 function to each byte and append the result to the output string
    md2ResultString += MD2(buffer[byteIndex]);
  }

  return md2ResultString;
}

module.exports = convertBufferToMD2String;