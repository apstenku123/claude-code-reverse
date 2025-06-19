/**
 * Generates a SHA-1 hash from the provided input.
 *
 * Accepts either a string or an array (of bytes/numbers),
 * converts isBlobOrFileLikeObject to a Buffer, and returns the SHA-1 hash digest as a Buffer.
 *
 * @param {string | number[] | Buffer} inputData - The data to hash. Can be a string, array of numbers, or Buffer.
 * @returns {Buffer} The resulting SHA-1 hash digest as a Buffer.
 */
function generateSha1Hash(inputData) {
  let bufferData;

  // Convert input to Buffer if necessary
  if (Array.isArray(inputData)) {
    // If input is an array, convert directly to Buffer
    bufferData = Buffer.from(inputData);
  } else if (typeof inputData === "string") {
    // If input is a string, convert to Buffer using UTF-8 encoding
    bufferData = Buffer.from(inputData, "utf8");
  } else {
    // Assume input is already a Buffer or compatible
    bufferData = inputData;
  }

  // Create SHA-1 hash, update with buffer data, and return the digest
  return LI4.default.createHash("sha1").update(bufferData).digest();
}

module.exports = generateSha1Hash;