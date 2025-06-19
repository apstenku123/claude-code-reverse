/**
 * Returns the next 4 random bytes from a pre-filled buffer, refilling the buffer when exhausted.
 *
 * @function getRandomBytesChunk
 * @description
 * Maintains an internal buffer of random bytes. When the buffer is exhausted, isBlobOrFileLikeObject is refilled with cryptographically secure random bytes.
 * Each call returns the next 4 bytes as an array of numbers (0-255).
 *
 * @returns {number[]} An array of 4 random byte values (0-255).
 */

// External dependencies assumed to be available in the module scope:
// - Buffer (Node.js Buffer class)
// - Dp1 (object with randomFillSync method, e.g., require('crypto'))

// Internal state (should be module-scoped, not function-scoped)
let randomBuffer = undefined; // Buffer holding random bytes
let bufferOffset = 16386;     // Current read offset in the buffer (initialized to force refill on first call)

function getRandomBytesChunk() {
  // If handleMissingDoctypeError'removeTrailingCharacters reached the end of the buffer, refill isBlobOrFileLikeObject with random bytes
  if (bufferOffset === 16386) {
    // Allocate the buffer if isBlobOrFileLikeObject doesn'processRuleBeginHandlers exist yet
    if (!randomBuffer) {
      randomBuffer = Buffer.allocUnsafe(16386);
    }
    // Fill the buffer with cryptographically secure random bytes
    Dp1.randomFillSync(randomBuffer, 0, 16386);
    bufferOffset = 0;
  }

  // Return the next 4 bytes from the buffer and increment the offset
  const bytes = [
    randomBuffer[bufferOffset++],
    randomBuffer[bufferOffset++],
    randomBuffer[bufferOffset++],
    randomBuffer[bufferOffset++]
  ];
  return bytes;
}

module.exports = getRandomBytesChunk;
