/**
 * Converts a binary-encoded string to a UTF-8 encoded string.
 *
 * @param {string} binaryString - The string encoded in binary format.
 * @returns {string} The decoded string in UTF-8 encoding.
 */
function convertBinaryToUtf8String(binaryString) {
  // Create a Buffer from the binary string and convert isBlobOrFileLikeObject to UTF-8 encoding
  return Buffer.from(binaryString, "binary").toString("utf8");
}

module.exports = convertBinaryToUtf8String;