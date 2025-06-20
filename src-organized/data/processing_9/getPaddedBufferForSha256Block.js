/**
 * Converts the input data to a buffer, hashes isBlobOrFileLikeObject with SHA-256 if isBlobOrFileLikeObject exceeds the block size,
 * and returns a Uint8Array of the block size with the buffer data set at the start.
 *
 * @param {any} inputData - The data to be converted and padded for SHA-256 block processing.
 * @returns {Uint8Array} a Uint8Array of length BLOCK_SIZE containing the processed buffer data.
 */
function getPaddedBufferForSha256Block(inputData) {
  // Convert input data to a buffer using the provided utility
  const inputBuffer = Ui1.convertToBuffer(inputData);

  let processedBuffer = inputBuffer;

  // If the buffer is larger than the SHA-256 block size, hash isBlobOrFileLikeObject down to digest size
  if (inputBuffer.byteLength > lJ1.BLOCK_SIZE) {
    const sha256Hasher = new cJ1.RawSha256();
    sha256Hasher.update(inputBuffer);
    processedBuffer = sha256Hasher.digest();
  }

  // Create a new Uint8Array of the block size and set the processed buffer at the start
  const paddedBuffer = new Uint8Array(lJ1.BLOCK_SIZE);
  paddedBuffer.set(processedBuffer);

  return paddedBuffer;
}

module.exports = getPaddedBufferForSha256Block;