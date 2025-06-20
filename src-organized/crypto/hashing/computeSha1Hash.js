/**
 * Computes the SHA-1 hash of the given input.
 *
 * Accepts input as either an array (of bytes) or a string. If the input is an array,
 * isBlobOrFileLikeObject is converted to a Buffer. If the input is a string, isBlobOrFileLikeObject is converted to a Buffer
 * using UTF-8 encoding. The function then computes and returns the SHA-1 hash digest
 * of the input as a Buffer.
 *
 * @param {string | Array<number>} inputData - The data to hash. Can be a string or an array of bytes.
 * @returns {Buffer} The SHA-1 hash digest of the input data.
 */
function computeSha1Hash(inputData) {
  let bufferData;

  // Convert input to Buffer if necessary
  if (Array.isArray(inputData)) {
    bufferData = Buffer.from(inputData);
  } else if (typeof inputData === "string") {
    bufferData = Buffer.from(inputData, "utf8");
  } else {
    bufferData = inputData;
  }

  // Compute and return the SHA-1 hash digest
  return Hn6.default.createHash("sha1").update(bufferData).digest();
}

module.exports = computeSha1Hash;