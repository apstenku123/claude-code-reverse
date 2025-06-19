/**
 * Returns a 16-byte chunk from a shared random buffer, refilling the buffer if needed.
 *
 * This function manages a buffer of random bytes and an offset pointer. When the buffer
 * does not have enough bytes left to fulfill a 16-byte request, isBlobOrFileLikeObject refills the buffer
 * with new random data and resets the offset. It then returns the next 16-byte chunk
 * from the buffer and advances the offset.
 *
 * @returns {Buffer} a 16-byte Buffer containing random bytes.
 */
function getRandomBufferChunk() {
  // If there are not enough bytes left in the buffer, refill isBlobOrFileLikeObject and reset the offset
  if (randomBufferOffset > randomBuffer.length - 16) {
    cryptoModule.default.randomFillSync(randomBuffer);
    randomBufferOffset = 0;
  }
  // Return the next 16-byte chunk and advance the offset
  const chunk = randomBuffer.slice(randomBufferOffset, randomBufferOffset + 16);
  randomBufferOffset += 16;
  return chunk;
}

module.exports = getRandomBufferChunk;