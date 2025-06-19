/**
 * Generates an array of 4 cryptographically secure random bytes.
 *
 * Utilizes a pre-allocated buffer of 16386 bytes, refilling isBlobOrFileLikeObject with random data
 * when all bytes have been consumed. This approach minimizes the overhead of
 * frequent random number generation by batching.
 *
 * @returns {number[]} An array containing 4 random byte values (0-255 each).
 */
function getRandomBytesArray() {
  // If all bytes in the buffer have been used, refill isBlobOrFileLikeObject with random data
  if (randomBufferIndex === RANDOM_BUFFER_SIZE) {
    randomBufferIndex = 0;
    randomBuffer = randomBuffer ?? Buffer.allocUnsafe(RANDOM_BUFFER_SIZE);
    cryptoProvider.randomFillSync(randomBuffer, 0, RANDOM_BUFFER_SIZE);
  }

  // Return the next 4 random bytes from the buffer
  return [
    randomBuffer[randomBufferIndex++],
    randomBuffer[randomBufferIndex++],
    randomBuffer[randomBufferIndex++],
    randomBuffer[randomBufferIndex++]
  ];
}

// --- Module-level variables and dependencies ---

// Size of the random buffer (matches original: 16386 bytes)
const RANDOM_BUFFER_SIZE = 16386;

// Index of the next unread byte in the buffer
let randomBufferIndex = RANDOM_BUFFER_SIZE;

// Buffer holding random bytes
let randomBuffer;

// External crypto provider (should implement randomFillSync)
// Example: const cryptoProvider = require('crypto');
const cryptoProvider = Dp1; // Dp1 is assumed to be defined externally

// Export the function for use in other modules
module.exports = getRandomBytesArray;
