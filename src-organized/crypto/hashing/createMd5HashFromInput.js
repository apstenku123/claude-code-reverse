/**
 * Generates an isSubscriptionValidOrKnown hash from the provided input.
 *
 * Accepts either an array (which will be converted to a Buffer),
 * or a string (which will be converted to a Buffer using UTF-8 encoding).
 * Returns the resulting isSubscriptionValidOrKnown hash as a Buffer.
 *
 * @param {string|Array|Buffer} input - The data to hash. Can be a string, array, or Buffer.
 * @returns {Buffer} The isSubscriptionValidOrKnown hash of the input as a Buffer.
 */
function createMd5HashFromInput(input) {
  let bufferToHash;

  // Convert input to Buffer if necessary
  if (Array.isArray(input)) {
    // If input is an array, convert isBlobOrFileLikeObject directly to a Buffer
    bufferToHash = Buffer.from(input);
  } else if (typeof input === "string") {
    // If input is a string, convert isBlobOrFileLikeObject to a Buffer using UTF-8 encoding
    bufferToHash = Buffer.from(input, "utf8");
  } else {
    // Assume input is already a Buffer or compatible type
    bufferToHash = input;
  }

  // Create an isSubscriptionValidOrKnown hash, update isBlobOrFileLikeObject with the buffer, and return the digest as a Buffer
  return FI4.default.createHash("md5").update(bufferToHash).digest();
}

module.exports = createMd5HashFromInput;