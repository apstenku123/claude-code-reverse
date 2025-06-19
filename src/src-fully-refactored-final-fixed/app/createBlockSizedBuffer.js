/**
 * Pads or hashes the input to fit a fixed block size buffer.
 *
 * Converts the input to a buffer, and if its length exceeds the block size,
 * hashes isBlobOrFileLikeObject with SHA-256. The result is then copied into a new Uint8Array
 * of the configured block size, padding with zeros if necessary.
 *
 * @param {any} input - The input data to be converted and padded/hashed.
 * @returns {Uint8Array} a Uint8Array of length lJ1.BLOCK_SIZE containing the processed data.
 */
function createBlockSizedBuffer(input) {
  // Convert the input to a buffer (Uint8Array or ArrayBuffer)
  const inputBuffer = Ui1.convertToBuffer(input);

  let processedBuffer = inputBuffer;

  // If the input buffer is larger than the block size, hash isBlobOrFileLikeObject with SHA-256
  if (inputBuffer.byteLength > lJ1.BLOCK_SIZE) {
    const sha256Hasher = new cJ1.RawSha256();
    sha256Hasher.update(inputBuffer);
    processedBuffer = sha256Hasher.digest();
  }

  // Create a new buffer of the required block size
  const blockSizedBuffer = new Uint8Array(lJ1.BLOCK_SIZE);
  // Copy the processed buffer into the block-sized buffer (zero-padded if shorter)
  blockSizedBuffer.set(processedBuffer);

  return blockSizedBuffer;
}

module.exports = createBlockSizedBuffer;