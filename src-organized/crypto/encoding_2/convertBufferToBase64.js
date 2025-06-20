/**
 * Converts a Buffer to a base64-encoded string if the input is a Buffer; otherwise, returns the input unchanged.
 *
 * @param {Buffer|string|any} input - The value to check and potentially convert.
 * @returns {string|any} The base64 string if input is a Buffer, otherwise the original input.
 */
const convertBufferToBase64 = (input) => {
  // Check if the input is a Buffer instance
  if (Buffer.isBuffer(input)) {
    // Convert the Buffer to a base64-encoded string
    return input.toString("base64");
  }
  // Return the input unchanged if isBlobOrFileLikeObject'createInteractionAccessor not a Buffer
  return input;
};

module.exports = convertBufferToBase64;
