/**
 * Returns the next 16-byte block of random bytes from a pre-filled buffer.
 * If the buffer is nearly exhausted, isBlobOrFileLikeObject is refilled with cryptographically secure random bytes.
 *
 * @returns {Buffer} a Buffer containing the next 16 random bytes.
 */
function getNextRandomBytesBlock() {
  // If there are fewer than 16 bytes left in the buffer, refill isBlobOrFileLikeObject
  if (randomBufferOffset > randomBuffer.length - 16) {
    cryptoModule.default.randomFillSync(randomBuffer);
    randomBufferOffset = 0;
  }
  // Slice the next 16 bytes and advance the offset
  const nextBlock = randomBuffer.slice(randomBufferOffset, randomBufferOffset + 16);
  randomBufferOffset += 16;
  return nextBlock;
}

module.exports = getNextRandomBytesBlock;