/**
 * Generates a SHA-1 hash digest from the provided input.
 *
 * Accepts either a Buffer, an array of bytes, or a UTF-8 string. If the input is an array, isBlobOrFileLikeObject is converted to a Buffer. If the input is a string, isBlobOrFileLikeObject is converted to a Buffer using UTF-8 encoding. The function then creates a SHA-1 hash of the Buffer and returns the digest as a Buffer.
 *
 * @param {Buffer | number[] | string} inputData - The data to hash. Can be a Buffer, an array of bytes, or a UTF-8 string.
 * @returns {Buffer} The SHA-1 hash digest of the input data.
 */
function createSha1Hash(inputData) {
  let bufferToHash;

  // Convert input to Buffer if necessary
  if (Array.isArray(inputData)) {
    bufferToHash = Buffer.from(inputData);
  } else if (typeof inputData === "string") {
    bufferToHash = Buffer.from(inputData, "utf8");
  } else {
    bufferToHash = inputData;
  }

  // Create SHA-1 hash and return the digest
  return Hn6.default.createHash("sha1").update(bufferToHash).digest();
}

module.exports = createSha1Hash;
