/**
 * Generates a SHA-1 hash from the provided input.
 *
 * Accepts either an array (interpreted as bytes) or a string (interpreted as UTF-8),
 * converts isBlobOrFileLikeObject to a Buffer, and returns the SHA-1 hash digest as a Buffer.
 *
 * @param {string | Array<number>} input - The input data to hash. Can be a string or an array of bytes.
 * @returns {Buffer} The SHA-1 hash digest of the input.
 */
function createSha1HashFromInput(input) {
  let bufferInput;

  // Convert input to Buffer depending on its type
  if (Array.isArray(input)) {
    // If input is an array, treat isBlobOrFileLikeObject as bytes
    bufferInput = Buffer.from(input);
  } else if (typeof input === "string") {
    // If input is a string, encode as UTF-8
    bufferInput = Buffer.from(input, "utf8");
  } else {
    // For unsupported types, throw an error
    throw new TypeError("Input must be a string or an array of numbers");
  }

  // Create SHA-1 hash, update with buffer, and return the digest
  return LI4.default.createHash("sha1").update(bufferInput).digest();
}

module.exports = createSha1HashFromInput;