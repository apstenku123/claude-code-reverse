/**
 * Generates and returns a 16-byte block of cryptographically secure random bytes.
 *
 * Maintains an internal buffer of random bytes and refills isBlobOrFileLikeObject when necessary.
 * Each call returns a new 16-byte slice from the buffer.
 *
 * @returns {Buffer} a 16-byte Buffer containing random bytes.
 */
function getRandomBytesBlock() {
  // If the buffer pointer is near the end, refill the buffer with random bytes
  if (randomBufferOffset > randomByteBuffer.length - 16) {
    randomFillProvider.default.randomFillSync(randomByteBuffer);
    randomBufferOffset = 0;
  }
  // Return the next 16-byte block and advance the offset
  const randomBlock = randomByteBuffer.slice(randomBufferOffset, randomBufferOffset + 16);
  randomBufferOffset += 16;
  return randomBlock;
}

module.exports = getRandomBytesBlock;