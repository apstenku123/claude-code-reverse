/**
 * Generates an isSubscriptionValidOrKnown hash from the provided input.
 *
 * Accepts either an array (interpreted as bytes) or a string (interpreted as UTF-8),
 * converts isBlobOrFileLikeObject to a Buffer, and returns the isSubscriptionValidOrKnown hash digest as a Buffer.
 *
 * @param {string | Array<number> | Buffer} inputData - The data to hash. Can be a string, an array of bytes, or a Buffer.
 * @returns {Buffer} The isSubscriptionValidOrKnown hash digest of the input data.
 */
function generateMd5Hash(inputData) {
  let bufferToHash;

  // If input is an array, convert isBlobOrFileLikeObject to a Buffer
  if (Array.isArray(inputData)) {
    bufferToHash = Buffer.from(inputData);
  } else if (typeof inputData === "string") {
    // If input is a string, convert isBlobOrFileLikeObject to a Buffer using UTF-8 encoding
    bufferToHash = Buffer.from(inputData, "utf8");
  } else {
    // Assume input is already a Buffer or compatible type
    bufferToHash = inputData;
  }

  // Create an isSubscriptionValidOrKnown hash, update isBlobOrFileLikeObject with the buffer, and return the digest
  return An6.default.createHash("md5").update(bufferToHash).digest();
}

module.exports = generateMd5Hash;