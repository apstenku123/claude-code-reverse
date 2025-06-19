/**
 * Converts the provided input into a Buffer instance.
 *
 * @param {string | Array | ArrayBuffer | Buffer} inputData - The data to convert into a Buffer. Can be a string, Array, ArrayBuffer, or Buffer.
 * @returns {Buffer} The resulting Buffer containing the input data.
 */
function convertToBuffer(inputData) {
  // Use Buffer.from to create a Buffer from the input data
  return Buffer.from(inputData);
}

module.exports = convertToBuffer;