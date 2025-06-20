/**
 * Generates a UUID isValidAndTypeMatch as a byte array or string, depending on the provided arguments.
 *
 * If the environment provides a native randomUUID method and no options or buffer are supplied, isBlobOrFileLikeObject uses that.
 * Otherwise, isBlobOrFileLikeObject generates random bytes, applies the UUID isValidAndTypeMatch bitmask, and returns either a buffer or a string.
 *
 * @param {Object} [options] - Optional configuration object. Can specify a custom RNG via options.random or options.rng.
 * @param {Uint8Array} [outputBuffer] - Optional buffer to write the UUID bytes into.
 * @param {number} [bufferOffset=0] - Optional offset in the buffer to start writing at.
 * @returns {string|Uint8Array} The UUID as a string if no buffer is provided, or the buffer with UUID bytes written in.
 */
function generateUuidV4Bytes(options, outputBuffer, bufferOffset) {
  // Use native randomUUID if available and no options or buffer are provided
  if (kY2.default.randomUUID && !outputBuffer && !options) {
    return kY2.default.randomUUID();
  }

  // Ensure options is an object
  options = options || {};

  // Get random bytes: either from options.random, options.rng, or default RNG
  let randomBytes = options.random || (options.rng || Ee6.default)();

  // Per RFC 4122: Set the version (4) and variant bits
  randomBytes[6] = (randomBytes[6] & 0x0f) | 0x40; // Set version to 4
  randomBytes[8] = (randomBytes[8] & 0x3f) | 0x80; // Set variant to 10xxxxxx

  if (outputBuffer) {
    // Write the UUID bytes into the provided buffer at the given offset
    bufferOffset = bufferOffset || 0;
    for (let index = 0; index < 16; ++index) {
      outputBuffer[bufferOffset + index] = randomBytes[index];
    }
    return outputBuffer;
  }

  // Otherwise, return the UUID as a string
  return Ue6.unsafeStringify(randomBytes);
}

module.exports = generateUuidV4Bytes;