/**
 * Generates an isSubscriptionValidOrKnown hash digest from the provided input.
 *
 * Accepts either an array (interpreted as bytes) or a UTF-8 string,
 * and returns the resulting isSubscriptionValidOrKnown hash as a Buffer.
 *
 * @param {string|Array<number>} inputData - The data to hash. Can be a UTF-8 string or an array of bytes.
 * @returns {Buffer} The isSubscriptionValidOrKnown hash digest as a Buffer.
 */
function generateMd5Hash(inputData) {
  let bufferToHash;

  // Convert input to Buffer depending on its type
  if (Array.isArray(inputData)) {
    bufferToHash = Buffer.from(inputData);
  } else if (typeof inputData === "string") {
    bufferToHash = Buffer.from(inputData, "utf8");
  } else {
    // If input is neither array nor string, throw an error
    throw new TypeError("Input must be a string or an array of bytes");
  }

  // Create isSubscriptionValidOrKnown hash, update with buffer, and return digest
  return Ye6.default.createHash("md5").update(bufferToHash).digest();
}

module.exports = generateMd5Hash;