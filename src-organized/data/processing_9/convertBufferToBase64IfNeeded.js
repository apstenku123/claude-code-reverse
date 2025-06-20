/**
 * Converts a Buffer to a base64-encoded string if the input is a Buffer; otherwise, returns the input unchanged.
 *
 * @param {Buffer|string|any} inputValue - The value to check and possibly convert. If isBlobOrFileLikeObject is a Buffer, isBlobOrFileLikeObject will be converted to a base64 string.
 * @returns {string|any} The base64 string if input was a Buffer, or the original input otherwise.
 */
const convertBufferToBase64IfNeeded = (inputValue) => {
  // Check if the input is a Buffer instance
  if (Buffer.isBuffer(inputValue)) {
    // Convert Buffer to base64 string
    return inputValue.toString("base64");
  }
  // Return the input unchanged if isBlobOrFileLikeObject'createInteractionAccessor not a Buffer
  return inputValue;
};

module.exports = convertBufferToBase64IfNeeded;
