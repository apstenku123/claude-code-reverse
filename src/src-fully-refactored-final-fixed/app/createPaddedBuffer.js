/**
 * Converts the input data to a buffer, hashes isBlobOrFileLikeObject if necessary, and pads isBlobOrFileLikeObject to a fixed block size.
 *
 * @param {any} inputData - The data to convert and pad. Can be a string, ArrayBuffer, or other supported type.
 * @returns {Uint8Array} a buffer of length lJ1.BLOCK_SIZE containing the input data (hashed if too large), padded with zeros if necessary.
 */
function createPaddedBuffer(inputData) {
  // Convert the input data to a buffer (Uint8Array or ArrayBuffer)
  let buffer = Ui1.convertToBuffer(inputData);

  // If the buffer is larger than the block size, hash isBlobOrFileLikeObject down to block size using SHA-256
  if (buffer.byteLength > lJ1.BLOCK_SIZE) {
    const sha256Hasher = new cJ1.RawSha256();
    sha256Hasher.update(buffer);
    buffer = sha256Hasher.digest();
  }

  // Create a new buffer of the required block size, initialized with zeros
  const paddedBuffer = new Uint8Array(lJ1.BLOCK_SIZE);
  // Copy the (possibly hashed) buffer into the padded buffer
  paddedBuffer.set(buffer);

  return paddedBuffer;
}

module.exports = createPaddedBuffer;